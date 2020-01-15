package com.waters.aem.core.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

public class MyAccountUtils {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static String getCountriesJson() throws JsonProcessingException {
        final List<Map<String, Object>> countryList = new ArrayList<>();

        countryList.addAll(Arrays.stream(Locale.getISOCountries())
            .map(MyAccountUtils :: getCountryMap)
            .sorted(Comparator.comparing(map -> (String) map.get("displayName")))
            .collect(Collectors.toList()));

        return MAPPER.writeValueAsString(countryList);
    }

    private static Map<String, Object> getCountryMap(final String countryCode) {
        final Map<String, Object> countryMap = new HashMap<>();

        final Locale locale = new Locale("", countryCode);

        countryMap.put("countryCode", locale.getCountry().toLowerCase());
        countryMap.put("displayName", locale.getDisplayCountry().replaceAll("'", "\'"));

        return countryMap;
    }

    private MyAccountUtils() {

    }
}
