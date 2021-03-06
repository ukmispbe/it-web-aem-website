import PropTypes from 'prop-types';

const propTypes = {
    text: PropTypes.object.isRequired,
    filterMap: PropTypes.any.isRequired,
    skuConfig: PropTypes.object.isRequired,
    searchParams: PropTypes.object.isRequired,
    category: PropTypes.any,
    categoryProps: PropTypes.shape({
        categories: PropTypes.arrayOf(PropTypes.object).isRequired,
        activeIndex: PropTypes.number.isRequired
    }).isRequired,
    categoryEvents: PropTypes.shape({
        onCategoryTabClick: PropTypes.func.isRequired,
        onCategoryDropdownChange: PropTypes.func.isRequired,
    }).isRequired,
    showSortFilterProps: PropTypes.shape({
        collapseFilters: PropTypes.func.isRequired
    }).isRequired,
    showSortFilterEvents: PropTypes.shape({
        onSetupFilters: PropTypes.func.isRequired,
        onResetToSavedState: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    }).isRequired,
    asideProps: PropTypes.shape({
        sortFilterIsPristine: PropTypes.bool,
        count: PropTypes.number,
        sortValue: PropTypes.number
    }).isRequired,
    asideEvents: PropTypes.shape({
        onHideSortFilterClick: PropTypes.func,
        onApplySortFilter: PropTypes.func,
        onCollapseFilters: PropTypes.func,
        onSort: PropTypes.func
    }).isRequired,
    menuProps: PropTypes.shape({
        showContentTypeMenu: PropTypes.bool.isRequired,
        showFacetMenu: PropTypes.bool.isRequired,
        heading: PropTypes.string
    }).isRequired,
    resultsProps: PropTypes.shape({
        rows: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        query: PropTypes.string,
        current: PropTypes.number.isRequired,
        noQuery: PropTypes.bool,
        spell_check: PropTypes.bool.isRequired,
        spell_related_suggestions: PropTypes.array.isRequired,
        spell_suggestion: PropTypes.string,
        items: PropTypes.any,
        isSkuList: PropTypes.bool.isRequired,
        pagination: PropTypes.object.isRequired
    }).isRequired,
    resultsEvents: PropTypes.shape({
        onRelatedSuggestionClick: PropTypes.func.isRequired,
        onResultsItemClick: PropTypes.func.isRequired,
        onPageChange: PropTypes.func.isRequired
    }).isRequired,
    contentTypeMenuProps: PropTypes.shape({
        items: PropTypes.array.isRequired
    }).isRequired,
    contentTypeMenuEvents: PropTypes.shape({
        onContentTypeItemClick: PropTypes.func.isRequired
    }).isRequired,
    facetMenuProps: PropTypes.shape({
        selectedValue: PropTypes.string,
        previousIcon: PropTypes.string
    }).isRequired,
    facetMenuEvents: PropTypes.shape({
        onContentTypeRemoval: PropTypes.func.isRequired,
    }).isRequired,
    subFacetFiltersProps: PropTypes.shape({
        items: PropTypes.array | PropTypes.object,
        filterMap: PropTypes.array.isRequired | PropTypes.object,
        defaultFacet: PropTypes.string,
        selectedFacets: PropTypes.object.isRequired,
        contentType: PropTypes.string,
        facetGroupsSelectedOrder: PropTypes.array.isRequired,
        collapseAllFilters: PropTypes.bool.isRequired,
        activeIndex: PropTypes.number.isRequired,
        subFacetMap: PropTypes.array.isRequired | PropTypes.object,
    }).isRequired,
    subFacetFiltersEvents: PropTypes.shape({
        onFilterSelect: PropTypes.func.isRequired,
        onGroupClick: PropTypes.func.isRequired
    }).isRequired,
    filterTagsProps: PropTypes.shape({
        keyword: PropTypes.string,
        spell_suggestion: PropTypes.string,
        contentTypeSelected: PropTypes.object.isRequired,
        selectedFacets: PropTypes.object.isRequired,
        facets: PropTypes.object.isRequired | PropTypes.array,
        defaultFacet: PropTypes.string,
        contentType: PropTypes.string
    }).isRequired,
    filterTagsEvents: PropTypes.shape({
        onClearAll: PropTypes.func.isRequired,
        onKeywordRemove: PropTypes.func.isRequired,
        onContentTypeRemove: PropTypes.func.isRequired,
        onSubFacetRemove: PropTypes.func.isRequired
    }).isRequired,
    subFacetMap: PropTypes.array.isRequired | PropTypes.object,
};

const defaultProps = {
    text: {},
    filterMap: {},
    skuConfig: {},
    searchParams: {},
    category: '',
    categoryProps: {
        categories: [],
        activeIndex: -1
    },
    categoryEvents: {
        onCategoryTabClick: () => {},
        onCategoryDropdownChange: () => {},
    },
    showSortFilterProps: {
        collapseFilters: () => {}
    },
    showSortFilterEvents: {
        onSetupFilters: () => {},
        onResetToSavedState: () => {},
        onClose: () => {}
    },
    asideProps: {
        sortFilterIsPristine: false,
        count: 0,
        sortValue: 1,
    },
    asideEvents: {
        onHideSortFilterClick: () => {},
        onApplySortFilter: () => {},
        onCollapseFilters: () => {},
        onSort: () => {}
    },
    menuProps: {
        showContentTypeMenu: false,
        showFacetMenu: false,
        heading: ''
    },
    resultsProps: {
        rows: 0,
        count: 0,
        query: "",
        current: 0,
        noQuery: false,
        spell_check: false,
        spell_related_suggestions: [],
        spell_suggestion: '',
        items: [],
        isSkuList: false,
        pagination: {},
        categoryOptions: [],
        categoryValue: 0
    },
    resultsEvents: {
        onRelatedSuggestionClick: () => {},
        onResultsItemClick: () => {},
        onPageChange: () => {}
    },
    contentTypeMenuProps: {
        items: []
    },
    contentTypeMenuEvents: {
        onContentTypeItemClick: () => {}
    },
    facetMenuProps: {
        selectedValue: '',
        previousIcon: ''
    },
    facetMenuEvents: {
        onContentTypeRemoval: () => {}
    },
    subFacetFiltersProps: {
        items: [],
        filterMap: {},
        defaultFacet: '',
        selectedFacets: {},
        contentType: '',
        facetGroupsSelectedOrder: [],
        collapseAllFilters: false,
        activeIndex: -1,
        subFacetMap: []
    },
    subFacetFiltersEvents: {
        onFilterSelect: () => {},
        onGroupClick: () => {}
    },
    filterTagsProps: {
        keyword: '',
        spell_suggestion: '',
        contentTypeSelected: {},
        selectedFacets: {},
        facets: {},
        defaultFacet: '',
        contentType: ''
    },
    filterTagsEvents: {
        onClearAll: () => {},
        onKeywordRemove: () => {},
        onContentTypeRemove: () => {},
        onSubFacetRemove: () => {}
    },
    subFacetMap: []
};

export {
    propTypes,
    defaultProps
};