import PropTypes from 'prop-types';

const propTypes = {
    text: PropTypes.object.isRequired,
    categoryProps: PropTypes.shape({
        categories: PropTypes.arrayOf(PropTypes.object).isRequired,
        activeIndex: PropTypes.number.isRequired
    }).isRequired,
    categoryEvents: PropTypes.shape({
        onCategoryTabClick: PropTypes.func.isRequired,
        onCategoryDropdownChange: PropTypes.func.isRequired,
    }).isRequired,
    showSortFilterProps: PropTypes.shape({
        collapseFilters: PropTypes.bool.isRequired
    }).isRequired,
    showSortFilterEvents: PropTypes.shape({
        onSetupFilters: PropTypes.func.isRequired,
        onResetToSavedState: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    }).isRequired,
    asideProps: PropTypes.shape({
        sortFilterIsPristine: PropTypes.bool.isRequired,
        count: PropTypes.number.isRequired,
        sortByText: PropTypes.text,
        sortByValue: PropTypes.number.isRequired
    }).isRequired,
    asideEvents: PropTypes.shape({
        onHideSortFilterClick: PropTypes.func.isRequired,
        onApplySortFilter: PropTypes.func.isRequired,
        onCollapseFilters: PropTypes.func.isRequired,
        onSort: PropTypes.func.isRequired
    }).isRequired,
    menuProps: PropTypes.shape({
        showContentTypeMenu: PropTypes.bool.isRequired,
        showFacetMenu: PropTypes.bool.isRequired,
        heading: PropTypes.text
    }).isRequired,
    resultsProps: PropTypes.shape({
        rows: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        query: PropTypes.text,
        current: PropTypes.number.isRequired,
        noQuery: PropTypes.bool.isRequired,
        spell_check: PropTypes.bool.isRequired,
        spell_related_suggestions: PropTypes.array.isRequired,
        spell_suggestion: PropTypes.text
    }).isRequired,
    resultsEvents: PropTypes.shape({
        onRelatedSuggestionClick: PropTypes.func.isRequired
    }).isRequired,
    contentTypeMenuProps: PropTypes.shape({
        items: PropTypes.array.isRequired
    }).isRequired,
    contentTypeMenuEvents: PropTypes.shape({
        onContentTypeItemClick: PropTypes.func.isRequired
    }).isRequired,
    facetMenuProps: PropTypes.shape({
        selectedValue: PropTypes.object.isRequired,
        previousIcon: PropTypes.string
    }).isRequired,
    facetMenuEvents: PropTypes.shape({
        onContentTypeRemoval: PropTypes.func.isRequired,
    }).isRequired,
    subFacetFiltersProps: PropTypes.shape({
        items: PropTypes.array.isRequired,
        filterMap: PropTypes.object.isRequired,
        defaultFacet: PropTypes.text,
        selectedFacets: PropTypes.object.isRequired,
        contentType: PropTypes.text,
        facetGroupsSelectedOrder: PropTypes.array.isRequired,
        collapseAllFilters: PropTypes.bool.isRequired,
        activeIndex: PropTypes.number.isRequired
    }).isRequired,
    subFacetFiltersEvents: PropTypes.shape({
        onFilterSelect: PropTypes.func.isRequired,
        onGroupClick: PropTypes.func.isRequired
    }).isRequired,
};

const defaultProps = {
    text: {},
    categoryProps: {
        categories: [],
        activeIndex: -1
    },
    categoryEvents: {
        onCategoryTabClick: () => {},
        onCategoryDropdownChange: () => {},
    },
    showSortFilterProps: {
        collapseFilters: false
    },
    showSortFilterEvents: {
        onSetupFilters: () => {},
        onResetToSavedState: () => {},
        onClose: () => {}
    },
    asideProps: {
        sortFilterIsPristine: true,
        count: 0,
        sortByText: '',
        sortByValue: 1,
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
        spell_suggestion: ''
    },
    resultsEvents: {
        onRelatedSuggestionClick: () => {}
    },
    contentTypeMenuProps: {
        items: []
    },
    contentTypeMenuEvents: {
        onContentTypeItemClick: () => {}
    },
    facetMenuProps: {
        selectedValue: {},
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
        activeIndex: -1
    },
    subFacetFiltersEvents: {
        onFilterSelect: () => {},
        onGroupClick: () => {}
    }
};

export {
    propTypes,
    defaultProps
};