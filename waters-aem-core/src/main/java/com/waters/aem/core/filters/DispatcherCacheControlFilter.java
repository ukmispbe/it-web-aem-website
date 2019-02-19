package com.waters.aem.core.filters;

import com.google.common.net.HttpHeaders;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.servlets.annotations.SlingServletFilter;
import org.apache.sling.servlets.annotations.SlingServletFilterScope;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

@Component(service = Filter.class,
    servicefactory = true,
    configurationPolicy = ConfigurationPolicy.REQUIRE,
    property = {
        Constants.SERVICE_RANKING + "=" + Integer.MIN_VALUE
    })
@Designate(ocd = DispatcherCacheControlFilterConfiguration.class, factory = true)
@SlingServletFilter(scope = {
    SlingServletFilterScope.REQUEST,
    SlingServletFilterScope.FORWARD,
    SlingServletFilterScope.INCLUDE
})
public final class DispatcherCacheControlFilter implements Filter {

    private static final Logger LOG = LoggerFactory.getLogger(DispatcherCacheControlFilter.class);

    private static final String SERVER_AGENT_NAME = "Server-Agent";

    private static final String DISPATCHER_AGENT_HEADER_VALUE = "Communique-Dispatcher";

    private static final String HEADER_PREFIX = "public,max-age=";

    private volatile String pattern;

    private volatile long maxAge;

    @Override
    public void doFilter(final ServletRequest servletRequest, final ServletResponse servletResponse,
        final FilterChain filterChain) throws IOException, ServletException {
        if (!(servletRequest instanceof HttpServletRequest) || !(servletResponse instanceof HttpServletResponse)) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;

        if (accepts(request)) {
            if (response.containsHeader(HttpHeaders.CACHE_CONTROL)) {
                LOG.debug("cache-control header already set, ignoring");
            } else {
                final String headerValue = HEADER_PREFIX + maxAge;

                LOG.debug("adding cache-control header: {}", headerValue);

                response.addHeader(HttpHeaders.CACHE_CONTROL, headerValue);
            }
        } else {
            LOG.debug("request not accepted, ignoring");
        }

        filterChain.doFilter(request, response);
    }

    @Override
    public void init(final FilterConfig filterConfig) {
        // do nothing
    }

    @Override
    public void destroy() {
        // do nothing
    }

    @Activate
    @Modified
    protected void activate(final DispatcherCacheControlFilterConfiguration configuration) {
        pattern = configuration.pattern();
        maxAge = configuration.maxAge();

        LOG.info("added dispatcher cache control filter for pattern : {} with max-age : {}s", pattern, maxAge);
    }

    private boolean accepts(final HttpServletRequest request) {
        final Enumeration<String> agentsEnum = request.getHeaders(SERVER_AGENT_NAME);
        final List<String> serverAgents = agentsEnum != null ? Collections.list(agentsEnum) : Collections.emptyList();

        return StringUtils.equalsIgnoreCase("get", request.getMethod())
            && request.getParameterMap().isEmpty()
            && serverAgents.contains(DISPATCHER_AGENT_HEADER_VALUE)
            && request.getPathInfo().matches(pattern);
    }
}
