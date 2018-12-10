package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
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
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> author = Collections.emptyList();

    @DialogField(fieldLabel = "Literature Code", ranking = 2)
    @TextField
    @Inject
    private String literatureCode;

    @DialogField(fieldLabel = "Content Type", ranking = 3)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> contentType = Collections.emptyList();

    @DialogField(fieldLabel = "Keyword", ranking = 4)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> keyword = Collections.emptyList();

    @DialogField(fieldLabel = "Instrument Type", ranking = 5)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> instrumentType = Collections.emptyList();

    @DialogField(fieldLabel = "Technique", ranking = 6)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> technique = Collections.emptyList();

    @DialogField(fieldLabel = "Separation Mode", ranking = 7)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> separationMode = Collections.emptyList();

    @DialogField(fieldLabel = "Compound Class", ranking = 8)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> compoundClass = Collections.emptyList();

    @DialogField(fieldLabel = "Column Type", ranking = 9)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> columnType = Collections.emptyList();

    @DialogField(fieldLabel = "Chromatography Software", ranking = 10)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> chromatographySoftware = Collections.emptyList();

    @DialogField(fieldLabel = "Market", ranking = 11)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> market = Collections.emptyList();

    @DialogField(fieldLabel = "Year Published", ranking = 12)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> yearPublished = Collections.emptyList();

    public List<Tag> getAuthor() {
        return author;
    }

    public String getLiteratureCode() {
        return literatureCode;
    }

    public List<Tag> getContentType() {
        return contentType;
    }

    public List<Tag> getKeyword() {
        return keyword;
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

    public List<Tag> getChromatographySoftware() {
        return chromatographySoftware;
    }

    public List<Tag> getMarket() {
        return market;
    }

    public List<Tag> getYearPublished() {
        return yearPublished;
    }

    public List<Tag> getCompoundClass() {
        return compoundClass;
    }
}
