package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.tagging.Tag;
import com.icfolson.aem.library.core.components.AbstractComponent;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.TagInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.List;

@Component(value = "Application Notes",
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE,
    name = WatersConstants.COMPONENT_NAME_PAGE,
    editConfig = false,
    fileName = ApplicationNotes.FILE_NAME,
    touchFileName = ApplicationNotes.FILE_NAME)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class ApplicationNotes extends AbstractComponent {

    static final String FILE_NAME = "applicationnotes";

    @DialogField(fieldLabel = "Author", ranking = 1)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> author;

    @DialogField(fieldLabel = "Literature Code", ranking = 2)
    @TextField
    @Inject
    private String literatureCode;

    @DialogField(fieldLabel = "Content Type", ranking = 3)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> contentType;

    @DialogField(fieldLabel = "Keyword", ranking = 4)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> keyword;

    @DialogField(fieldLabel = "Instrument Type", ranking = 5)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> instrumentType;

    @DialogField(fieldLabel = "Technique", ranking = 6)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> technique;

    @DialogField(fieldLabel = "Separation Mode", ranking = 7)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> separationMode;

    @DialogField(fieldLabel = "Compound Class", ranking = 8)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> compoundClass;

    @DialogField(fieldLabel = "Column Type", ranking = 9)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> columnType;

    @DialogField(fieldLabel = "Chromatography Software", ranking = 10)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> chromatographySoftware;

    @DialogField(fieldLabel = "Market", ranking = 11)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> market;

    @DialogField(fieldLabel = "Year Published", ranking = 12)
    @TagInputField(rootPath = WatersConstants.ROOT_PATH_WATERS_TAGS)
    @TagInject
    private List<Tag> yearPublished;

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
