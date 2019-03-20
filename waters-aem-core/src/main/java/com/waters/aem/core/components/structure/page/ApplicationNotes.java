package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.tagging.Tag;
import com.google.common.collect.ImmutableList;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.icfolson.aem.library.models.annotations.TagInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

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

    public static final String PROPERTY_LITERATURE_CODE = "literatureCode";

    @Self
    private Resource resource;

    @Inject
    private PageDecorator page;

    @DialogField(fieldLabel = "Author", ranking = 1)
    @TagInputField
    @TagInject
    private List<Tag> author = Collections.emptyList();

    @DialogField(fieldLabel = "Affiliations", ranking = 2)
    @TagInputField
    @TagInject
    private List<Tag> affiliations = Collections.emptyList();

    @DialogField(fieldLabel = "Literature Code", ranking = 3)
    @TextField
    @Inject
    private String literatureCode;

    @DialogField(fieldLabel = "Category", ranking = 4)
    @TagInputField
    @TagInject
    private List<Tag> category = Collections.emptyList();

    @DialogField(fieldLabel = "Content Type", ranking = 5)
    @TagInputField
    @TagInject
    private List<Tag> contentType = Collections.emptyList();

    @DialogField(fieldLabel = "Instrument Type", ranking = 6)
    @TagInputField
    @TagInject
    private List<Tag> instrumentType = Collections.emptyList();

    @DialogField(fieldLabel = "Technique", ranking = 7)
    @TagInputField
    @TagInject
    private List<Tag> technique = Collections.emptyList();

    @DialogField(fieldLabel = "Separation Mode", ranking = 8)
    @TagInputField
    @TagInject
    private List<Tag> separationMode = Collections.emptyList();

    @DialogField(fieldLabel = "Compound/Matrix", ranking = 9)
    @TagInputField
    @TagInject
    private List<Tag> compoundMatrix = Collections.emptyList();

    @DialogField(fieldLabel = "Column Type", ranking = 10)
    @TagInputField
    @TagInject
    private List<Tag> columnType = Collections.emptyList();

    @DialogField(fieldLabel = "Software", ranking = 11)
    @TagInputField
    @TagInject
    private List<Tag> software = Collections.emptyList();

    @DialogField(fieldLabel = "Market", ranking = 12)
    @TagInputField
    @TagInject
    private List<Tag> market = Collections.emptyList();

    @DialogField(fieldLabel = "Month Published", ranking = 13)
    @TagInputField
    @TagInject
    private List<Tag> monthPublished = Collections.emptyList();

    @DialogField(fieldLabel = "Year Published", ranking = 14)
    @TagInputField
    @TagInject
    private List<Tag> yearPublished = Collections.emptyList();

    public List<Tag> getAllTags() {
        return new ImmutableList.Builder<Tag>()
            .addAll(author)
            .addAll(category)
            .addAll(contentType)
            .addAll(instrumentType)
            .addAll(technique)
            .addAll(separationMode)
            .addAll(columnType)
            .addAll(software)
            .addAll(market)
            .addAll(compoundMatrix)
            .addAll(affiliations)
            .addAll(yearPublished)
            .build();
    }

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

    public List<Tag> getAffiliations() {
        return affiliations;
    }

    /**
     * Get the DAM asset folder path for this page's year and literature code.
     *
     * @return asset folder path or null if page is missing required metadata
     */
    public String getAssetFolderPath() {
        String assetFolderPath = null;

        if (!yearPublished.isEmpty() && literatureCode != null) {
            assetFolderPath = new StringBuilder(WatersConstants.DAM_PATH_APP_NOTES)
                .append(yearPublished.get(0).getName())
                .append("/")
                .append(literatureCode)
                .toString();
        }

        return assetFolderPath;
    }

    /**
     * Get the DAM asset path of the generated PDF for the current page.
     *
     * @return PDF asset path or null if page is missing required metadata
     */
    public String getPdfAssetPath() {
        final String assetFolderPath = getAssetFolderPath();

        String pdfAssetPath = null;

        if (assetFolderPath != null) {
            final String languageCode = page.getLanguage(false).getLanguage().toLowerCase();

            pdfAssetPath = new StringBuilder(assetFolderPath)
                .append("/")
                .append(literatureCode)
                .append("-")
                .append(languageCode)
                .append(".pdf")
                .toString();
        }

        return pdfAssetPath;
    }

    public Resource getResource() {
        return resource;
    }
}
