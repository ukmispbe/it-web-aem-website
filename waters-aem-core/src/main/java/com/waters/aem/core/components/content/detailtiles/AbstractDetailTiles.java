package com.waters.aem.core.components.content.detailtiles;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.services.account.WatersAccountService;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.annotation.Nonnull;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public abstract class AbstractDetailTiles implements ComponentExporter {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @OSGiService
    private WatersAccountService accountService;

    public String getMyAccountUrl() {
        return accountService.getUserDetailsUrl();
    }

    public String getMyAccountUpdateUrl() {
        return accountService.getUserDetailsUrl();
    }

    public String getCountriesJson() throws JsonProcessingException {
        final List<Map<String, Object>> countryList = new ArrayList<>();

        countryList.addAll(Arrays.asList(Locale.getISOCountries()).stream()
                .map(this::getCountryMap)
                .sorted(Comparator.comparing(map -> (String)map.get("displayName")))
                .collect(Collectors.toList()));

        return MAPPER.writeValueAsString(countryList);
    }

    private Map<String, Object> getCountryMap(String countryCode) {
        final Map<String, Object> countryMap = new HashMap<>();

        final Locale locale = new Locale("", countryCode);

        countryMap.put("countryCode", locale.getCountry().toLowerCase());
        countryMap.put("displayName", locale.getDisplayCountry().replaceAll("'", "\'"));

        return countryMap;
    }

    @Nonnull
    @Override
    public abstract String getExportedType();

}
