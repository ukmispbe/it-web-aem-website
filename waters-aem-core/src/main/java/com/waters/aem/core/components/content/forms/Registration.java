package com.waters.aem.core.components.content.forms;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Component(value = "Registration Form",
    description = "This is the Registration Form component for Waters site",
    path = WatersConstants.COMPONENT_PATH_REGISTRATION_FORM)
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Registration.class, ComponentExporter.class },
    resourceType = Registration.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class Registration implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/forms/registration";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    public String getCountriesJson() throws JsonProcessingException {
        final List<Map<String, Object>> countryList = new ArrayList<>();

        countryList.addAll(Arrays.asList(Locale.getISOCountries()).stream()
        .map(this::getCountryMap)
        .collect(Collectors.toList()));

        return MAPPER.writeValueAsString(countryList);
    }

    public Map<String, Object> getCountryMap(String countryCode) {
        final Map<String, Object> countryMap = new HashMap<>();

        Locale locale = new Locale("", countryCode);

        countryMap.put("countryCode", locale.getCountry().toLowerCase());
        countryMap.put("displayName", locale.getDisplayName());

        return countryMap;
    }


    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
