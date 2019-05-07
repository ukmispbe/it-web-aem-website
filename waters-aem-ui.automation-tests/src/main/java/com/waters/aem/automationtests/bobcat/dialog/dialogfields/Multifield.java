package com.waters.aem.automationtests.bobcat.dialog.dialogfields;

import com.cognifide.qa.bb.aem.core.component.configuration.MultifieldEntry;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.exceptions.BobcatRuntimeException;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.Iterator;
import java.util.List;

/**
 * This class represents TouchUI dialog multifield.
 */
@PageObject
public class Multifield implements DialogField {

    @FindBy(css = "button.coral-Button.coral-Button--secondary")
    private WebElement addButton;

    @FindBy(css = ".coral-Multifield-item")
    private List<MultifieldItem> items;

    /**
     * Sets next element in dialog multifield.
     *
     * @param value yaml configuration containing list of {@link MultifieldEntry} representation.
     */
    @Override
    public void setValue(Object value) {
        ObjectMapper mapper = new ObjectMapper(new YAMLFactory());

        List<MultifieldEntry> cfg = mapper.convertValue(value, new TypeReference<List<MultifieldEntry>>() {
        });

        items.forEach(MultifieldItem :: deleteItem);

        cfg.forEach(entry -> addField());

        Iterator<MultifieldItem> itemsIterator = items.iterator();
        cfg.forEach(entry -> itemsIterator.next().setValue(entry));
    }

    /**
     * Returns MultifieldItem at declared index position
     *
     * @param index integer representing required position
     * @return MultifieldItem
     */
    public MultifieldItem getItemAtIndex(int index) {
        int itemsSize = items.size();

        if (itemsSize > index) {
            return items.get(index);
        }

        throw new BobcatRuntimeException(String
            .format("Tried to get item at index %s but there are only %s elements", index, itemsSize));
    }

    /**
     * Adds a new {@link MultifieldItem}.
     */
    public void addField() {
        addButton.click();
    }
}
