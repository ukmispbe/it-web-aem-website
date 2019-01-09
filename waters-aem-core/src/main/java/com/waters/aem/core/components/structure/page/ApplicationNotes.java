package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.tagging.Tag;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.TagInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.Collections;
import java.util.List;

@Component(value = "Application Notes",
    tabs = @Tab(
        title = "Application Notes",
        renderConditionResourceType = WatersConstants.RENDER_CONDITION_APPLICATION_NOTES_TEMPLATE
    ),
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE,
    name = WatersConstants.COMPONENT_NAME_PAGE,
    editConfig = false,
    fileName = ApplicationNotes.FILE_NAME,
    touchFileName = ApplicationNotes.FILE_NAME)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class ApplicationNotes {

    static final String FILE_NAME = "applicationnotes";

    @DialogField(fieldLabel = "Author", ranking = 1)
    @TagInputField
    @TagInject
    private List<Tag> author = Collections.emptyList();

    @DialogField(fieldLabel = "Literature Code", ranking = 2)
    @TextField
    @Inject
    private String literatureCode;

    @DialogField(fieldLabel = "Category", ranking = 3)
    @TagInputField
    @TagInject
    private List<Tag> category = Collections.emptyList();

    @DialogField(fieldLabel = "Content Type", ranking = 4)
    @TagInputField
    @TagInject
    private List<Tag> contentType = Collections.emptyList();

    @DialogField(fieldLabel = "Instrument Type", ranking = 5)
    @TagInputField
    @TagInject
    private List<Tag> instrumentType = Collections.emptyList();

    @DialogField(fieldLabel = "Technique", ranking = 6)
    @TagInputField
    @TagInject
    private List<Tag> technique = Collections.emptyList();

    @DialogField(fieldLabel = "Separation Mode", ranking = 7)
    @TagInputField
    @TagInject
    private List<Tag> separationMode = Collections.emptyList();

    @DialogField(fieldLabel = "Compound/Matrix", ranking = 8)
    @TagInputField
    @TagInject
    private List<Tag> compoundMatrix = Collections.emptyList();

    @DialogField(fieldLabel = "Column Type", ranking = 9)
    @TagInputField
    @TagInject
    private List<Tag> columnType = Collections.emptyList();

    @DialogField(fieldLabel = "Software", ranking = 10)
    @TagInputField
    @TagInject
    private List<Tag> software = Collections.emptyList();

    @DialogField(fieldLabel = "Market", ranking = 11)
    @TagInputField
    @TagInject
    private List<Tag> market = Collections.emptyList();

    @DialogField(fieldLabel = "Month Published", ranking = 12)
    @TagInputField
    @TagInject
    private List<Tag> monthPublished = Collections.emptyList();

    @DialogField(fieldLabel = "Year Published", ranking = 13)
    @TagInputField
    @TagInject
    private List<Tag> yearPublished = Collections.emptyList();

    public List<Tag> getAuthor() {
        return author;
    }

    public String getLiteratureCode() {
        return literatureCode;
    }

    public List<Tag> getCategory() {
        return category;
    }

    public List<Tag> getContentType() {
        return contentType;
    }

    public List<Tag> getInstrumentType() {
        return instrumentType;
    }

    public List<Tag> getTechnique() {
        return technique;
    }

    public List<Tag> getSeparationMode() {
        return separationMode;
    }

    public List<Tag> getColumnType() {
        return columnType;
    }

    public List<Tag> getSoftware() {
        return software;
    }

    public List<Tag> getMarket() {
        return market;
    }

    public List<Tag> getMonthPublished() {
        return monthPublished;
    }

    public List<Tag> getYearPublished() {
        return yearPublished;
    }

    public List<Tag> getCompoundMatrix() {
        return compoundMatrix;
    }
}
