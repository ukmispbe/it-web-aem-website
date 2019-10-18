package com.waters.aem.core.form.captcha.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.form.captcha.CaptchaService;
import com.waters.aem.core.form.captcha.CaptchaServiceConfiguration;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component(service = CaptchaService.class)
@Designate(ocd = CaptchaServiceConfiguration.class)
public class DefaultCaptchaService implements CaptchaService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultCaptchaService.class);

    private volatile String jsApi;

    private volatile String siteKey;

    private volatile String siteSecret;

    private volatile String verifyApi;

    @Override
    public String getJsApi() {
        return jsApi;
    }

    @Override
    public String getSiteKey() {
        return siteKey;
    }

    @Override
    public String getVerifyApi() {
        return verifyApi;
    }

    @Override
    public boolean verify(String token) {
        boolean result = false;

        if (StringUtils.isNotBlank(token)) {
            CloseableHttpClient httpclient = HttpClients.createDefault();
            try {
                final HttpPost httppost = new HttpPost(verifyApi);

                final List<NameValuePair> params = new ArrayList<>(2);
                params.add(new BasicNameValuePair("secret", siteSecret));
                params.add(new BasicNameValuePair("response", token));
                httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));

                LOG.info("Executing request " + httppost.getRequestLine());

                // Create a custom response handler
                ResponseHandler<String> responseHandler = response -> {
                    int status = response.getStatusLine().getStatusCode();
                    if (status >= 200 && status < 300) {
                        HttpEntity entity = response.getEntity();
                        return entity != null ? EntityUtils.toString(entity) : null;
                    } else {
                        throw new ClientProtocolException("Unexpected response status: " + status);
                    }
                };
                String responseBody = httpclient.execute(httppost, responseHandler);

                if (StringUtils.isNotBlank(responseBody)) {
                    ObjectMapper mapper = new ObjectMapper();
                    JsonNode responseJson = mapper.readTree(responseBody);
                    result = responseJson.get("success").asBoolean();
                }
                if (!result) {
                    LOG.error("Captcha validation failure: " + responseBody);
                }
            } catch (IOException e) {
                LOG.error("Something went wrong while trying to verify a Captcha token.", e);
            } finally {
                try {
                    httpclient.close();
                } catch (Exception e) {
                    LOG.error("Unable to close Captcha verification http client.", e);
                }
            }
        }

        return result;
    }

    @Activate
    @Modified
    protected void activate(final CaptchaServiceConfiguration configuration) {
        this.jsApi = configuration.jsApi();
        this.verifyApi = configuration.verifyApi();
        this.siteKey = configuration.siteKey();
        this.siteSecret = configuration.siteSecret();
    }
}