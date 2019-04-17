package com.waters.aem.automationtests.core.sidepanel;

import org.apache.commons.lang3.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * Helper that locates components in Side Panel
 */
public class ComponentTreeLocatorHelper {

    private static final Logger LOG = LoggerFactory.getLogger(
        ComponentTreeLocatorHelper.class);

    //Beautiful xpath that can be really broken in any new AEM version
    private static final String COMPONENT_ITEM_XPATH_FORMAT =
        "./coral-tree-item/div/div/coral-tree-item-content/span/span[@class='editor-ContentTree-itemTitle'and (text()='%s' or text()='%s: ') ]";

    /**
     * Search component on tree
     *
     * @param path how many containers is between
     * @param componentName component name
     * @param elementNumber which component (default 0) it there is more then one
     * @param currentScope
     * @return
     */
    public static WebElement getComponentWebElement(String path, String componentName, int elementNumber,
        WebElement currentScope) {
        String[] containers = StringUtils.split(path, "/");
        WebElement component = currentScope;

        for (String container : containers) {
            component = setComponent(component, container);
        }

        List<WebElement> elements = component.findElement(By.cssSelector(".coral-Tree-subTree"))
            .findElements(By.xpath(String.format(COMPONENT_ITEM_XPATH_FORMAT, componentName, componentName)));

        if (!elements.isEmpty()) {
            component = elements.get(elementNumber);
        }

        return component;
    }

    private static WebElement setComponent(WebElement component, String container) {
        List<WebElement> elements = component.findElements(By.className("coral-Tree-item--drilldown"));

        if (!elements.isEmpty()) {
            return elements.get(calculateElementNumber(container));
        }

        return component;
    }

    private static int calculateElementNumber(String element) {
        int toReturn = 0;

        String elementNumber = StringUtils.substringBetween(element, "[", "]");

        if (null != elementNumber) {
            try {
                toReturn = Integer.parseInt(elementNumber);
            } catch (NumberFormatException e) {
                LOG.error("Error in component settings", e);
            }
        }

        return toReturn;
    }

    private ComponentTreeLocatorHelper() {
        //util
    }
}
