package com.waters.aem.automationtests.bobcat.modules;

import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.Fields;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.text.ControlToolbar;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.text.FontFormat;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.text.JustifyControls;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.text.JustifyControlsImpl;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.text.ListControls;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.text.ListControlsImpl;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.text.ListDialogPanel;
import com.google.inject.AbstractModule;
import com.google.inject.multibindings.MapBinder;
import com.waters.aem.automationtests.bobcat.dialog.dialogfields.Checkbox;
import com.waters.aem.automationtests.bobcat.dialog.dialogfields.Image;
import com.waters.aem.automationtests.bobcat.dialog.dialogfields.Multifield;
import com.waters.aem.automationtests.bobcat.dialog.dialogfields.MultifieldItem;
import com.waters.aem.automationtests.bobcat.dialog.dialogfields.PathBrowser;
import com.waters.aem.automationtests.bobcat.dialog.dialogfields.RadioGroup;
import com.waters.aem.automationtests.bobcat.dialog.dialogfields.RichText;
import com.waters.aem.automationtests.bobcat.dialog.dialogfields.Select;
import com.waters.aem.automationtests.bobcat.dialog.dialogfields.Textfield;
import com.waters.aem.automationtests.bobcat.dialog.dialogfields.Switch;
import com.waters.aem.automationtests.bobcat.dialog.dialogfields.text.ControlToolbarImpl;
import com.waters.aem.automationtests.bobcat.dialog.dialogfields.text.JustifyDialogPanel;

/**
 * This module contains bindings for TouchUI dialog fields.
 */
public class AemFieldsModule extends AbstractModule {

    public static final String SWITCH = "SWITCH";

    @Override
    protected void configure() {
        bind(ControlToolbar.class).to(ControlToolbarImpl.class);
        bind(JustifyControls.class).to(JustifyControlsImpl.class);
        bind(ListControls.class).to(ListControlsImpl.class);

        MapBinder<String, DialogField> fieldsBinder = MapBinder
            .newMapBinder(binder(), String.class, DialogField.class);

        fieldsBinder.addBinding(Fields.CHECKBOX).to(Checkbox.class);
        fieldsBinder.addBinding(SWITCH).to(Switch.class);
        fieldsBinder.addBinding(Fields.TEXTFIELD).to(Textfield.class);
        fieldsBinder.addBinding(Fields.IMAGE).to(Image.class);
        fieldsBinder.addBinding(Fields.PATHBROWSER).to(PathBrowser.class);
        fieldsBinder.addBinding(Fields.SELECT).to(Select.class);
        fieldsBinder.addBinding(Fields.RICHTEXT).to(RichText.class);
        fieldsBinder.addBinding(Fields.MULTIFIELD).to(Multifield.class);
        fieldsBinder.addBinding(Fields.MULTIFIELD_ITEM).to(MultifieldItem.class);
        fieldsBinder.addBinding(Fields.RICHTEXT_FONT_FORMAT).to(FontFormat.class);
        fieldsBinder.addBinding(Fields.RICHTEXT_JUSTIFY).to(JustifyDialogPanel.class);
        fieldsBinder.addBinding(Fields.RICHTEXT_LIST).to(ListDialogPanel.class);
        fieldsBinder.addBinding(Fields.RADIO_GROUP).to(RadioGroup.class);
        fieldsBinder.addBinding(Fields.RADIO_GROUP_MULTI).to(RadioGroup.class);
    }
}
