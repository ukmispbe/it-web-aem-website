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
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.metadata.ContentClassification;
import com.waters.aem.core.tagging.WatersTagInject;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
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
@SuppressWarnings({ "common-java:DuplicatedBlocks" })
public final class ApplicationNotes implements ContentClassification {

    static final String FILE_NAME = "applicationnotes";

    public static final String PROPERTY_LITERATURE_CODE = "literatureCode";

    private static final String DEFAULT_DAY_NUMBER = "01";

    private static final String FIRST_PUBLISH_DATE_FORMAT = "yyyy-MMM-dd";

    @Self
    private Resource resource;

    @Inject
    private PageDecorator page;

    @DialogField(fieldLabel = "Literature Code (without language code)", ranking = 1)
    @TextField
    @Inject
    private String literatureCode;

    @DialogField(fieldLabel = "Author", ranking = 2)
    @TagInputField
    @WatersTagInject
    private List<Tag> author = Collections.emptyList();

    @DialogField(fieldLabel = "Affiliations", ranking = 3)
    @TagInputField
    @WatersTagInject
    private List<Tag> affiliations = Collections.emptyList();

    @DialogField(fieldLabel = "Category", ranking = 4)
    @TagInputField
    @WatersTagInject
    private List<Tag> category = Collections.emptyList();

    @DialogField(fieldLabel = "Content Type", ranking = 5)
    @TagInputField
    @WatersTagInject
    private List<Tag> contentType = Collections.emptyList();

    @DialogField(fieldLabel = "Instrument Technique", ranking = 6)
    @TagInputField
    @WatersTagInject
    private List<Tag> instrumentTechnique = Collections.emptyList();

    @DialogField(fieldLabel = "Separation Mode", ranking = 7)
    @TagInputField
    @WatersTagInject
    private List<Tag> separationMode = Collections.emptyList();

    @DialogField(fieldLabel = "Compound/Analyte", ranking = 8)
    @TagInputField
    @WatersTagInject
    private List<Tag>  compoundAnalyte = Collections.emptyList();

    @DialogField(fieldLabel = "Matrix", ranking = 9)
    @TagInputField
    @WatersTagInject
    private List<Tag> matrix = Collections.emptyList();

    @DialogField(fieldLabel = "Column Type", ranking = 10)
    @TagInputField
    @WatersTagInject
    private List<Tag> columnType = Collections.emptyList();

    @DialogField(fieldLabel = "Products", ranking = 11)
    @TagInputField
    @WatersTagInject
    private List<Tag> products = Collections.emptyList();

    @DialogField(fieldLabel = "Market", ranking = 12)
    @TagInputField
    @WatersTagInject
    private List<Tag> market = Collections.emptyList();

    @DialogField(fieldLabel = "Month Published", ranking = 13)
    @TagInputField
    @WatersTagInject
    private List<Tag> monthPublished = Collections.emptyList();

    @DialogField(fieldLabel = "Year Published", ranking = 14)
    @TagInputField
    @WatersTagInject
    private List<Tag> yearPublished = Collections.emptyList();

    @Override
    public List<Tag> getAllTags() {
        return new ImmutableList.Builder<Tag>()
            .addAll(author)
            .addAll(category)
            .addAll(contentType)
            .addAll(instrumentTechnique)
            .addAll(compoundAnalyte)
            .addAll(separationMode)
            .addAll(columnType)
            .addAll(products)
            .addAll(market)
            .addAll(matrix)
            .addAll(yearPublished)
            .addAll(affiliations)
            .build();
    }

    @Override
    public String getLiteratureCode() {
        return literatureCode;
    }

    @Override
    public List<Tag> getCategory() {
        return category;
    }

    @Override
    public List<Tag> getContentType() {
        return contentType;
    }

     @Override
    public List<Tag> getCompoundAnalyte() { return compoundAnalyte; }

    @Override
    public List<Tag> getMonthPublished() {
        return monthPublished;
    }

    @Override
    public List<Tag> getYearPublished() {
        return yearPublished;
    }

    @Override
    public List<Tag> getSeparationMode() {
        return separationMode;
    }

    @Override
    public List<Tag> getMarket() {
        return market;
    }

    @Override
    public List<Tag> getInstrumentTechnique() {
        return instrumentTechnique;
    }


    public List<Tag> getAuthor() {
        return author;
    }

    public List<Tag> getColumnType() {
        return columnType;
    }

    public List<Tag> getProducts() {
        return products;
    }

    @Override
    public List<Tag> getMatrix() {
        return matrix;
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
            final String languageCode = getLanguageCode();

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

    public String getFormattedPublishDate() {
        final String year = getDateTagName(yearPublished);
        final String month = getDateTagName(monthPublished);

        String formattedPublishDate = "";

        if (StringUtils.isNotEmpty(year) && StringUtils.isNotEmpty(month)) {
            try {
                final String dateString = new StringBuilder()
                    .append(year)
                    .append("-")
                    .append(month)
                    .append("-")
                    .append(DEFAULT_DAY_NUMBER)
                    .toString();

                final Date date = new SimpleDateFormat(FIRST_PUBLISH_DATE_FORMAT).parse(dateString);

                formattedPublishDate = WatersConstants.DATE_FORMAT_ISO_8601.format(date);
            } catch (ParseException e) {
                // ignore
            }
        }

        return formattedPublishDate;
    }

    private String getDateTagName(final List<Tag> tags) {
        return tags.isEmpty() ? "" : tags.get(0).getName();
    }

    public String getLanguageCode() {
        return page.getLanguage(false).getLanguage().toLowerCase();
    }
}
