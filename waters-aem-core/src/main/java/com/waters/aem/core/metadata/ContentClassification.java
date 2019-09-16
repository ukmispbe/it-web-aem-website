package com.waters.aem.core.metadata;

        import com.day.cq.tagging.Tag;

        import java.util.List;

/**
 * Page and asset metadata.
 */
public interface ContentClassification {

    String getLiteratureCode();

    List<Tag> getCategory();

    List<Tag> getContentType();

    List<Tag> getProducts();

    List<Tag> getMatrix();

    List<Tag> getSeparationMode();

    List<Tag> getMarket();

    List<Tag> getInstrumentTechnique();

    List<Tag> getCompoundAnalyte();

    List<Tag> getMonthPublished();

    List<Tag> getYearPublished();

    List<Tag> getAllTags();
}
