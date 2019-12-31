import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import props from '../__mocks__/en_US';
import { defaultProps } from '../search.component.props';
import SearchComponent from '../search.component';

describe("Feature: Search Component", () => {
    beforeAll(() => {
        window.matchMedia = jest.fn(() => {
            return {
                match: true
            }
        });
    });

    afterAll(() => {
        jest.mockRestoreAll();
    });

    const propsMock = {
        ...defaultProps,
        text: props.searchText,
        filterMap: props.filterMap,
        categoryEvents: {
            onCategoryTabClick: jest.fn(),
            onCategoryDropdownChange: jest.fn()
        },
        showSortFilterEvents: {
            onSetupFilters: jest.fn(),
            onResetToSavedState: jest.fn(),
            onClose: jest.fn()
        },
        asideEvents: {
            onHideSortFilterClick: jest.fn(),
            onApplySortFilter: jest.fn(),
            onCollapseFilters: jest.fn(),
            onSort: jest.fn()
        },
        resultsEvents: {
            onRelatedSuggestionClick: jest.fn(),
            onResultsItemClick: jest.fn(),
            onPageChange: jest.fn()
        },
        contentTypeMenuEvents: {
            onContentTypeItemClick: jest.fn()
        },
        facetMenuEvents: {
            onContentTypeRemoval: jest.fn()
        },
        subFacetFiltersEvents: {
            onFilterSelect: jest.fn(),
            onGroupClick: jest.fn()
        },
        filterTagsEvents: {
            onClearAll: jest.fn(),
            onKeywordRemove: jest.fn(),
            onContentTypeRemove: jest.fn(),
            onSubFacetRemove: jest.fn()
        }
    };

    const propsMockCategoryOnly = {
        ...propsMock,
        menuProps: {
            showContentTypeMenu: true,
            showFacetMenu: false,
            heading: 'filter By'
        }
    }

    const propsMockContentType = {
        ...propsMock,
        menuProps: {
            showContentTypeMenu: false,
            showFacetMenu: true,
            heading: 'filter By'
        }
    }

    describe("Scenario: Rendering", () => {
        describe("When searching by Category only", () => {
            it("Then it should math snapshot", () => {
                const json = renderer.create(<SearchComponent {...propsMockCategoryOnly} />);

                expect(json).toMatchSnapshot();
                
            });
        });

        describe("When searching by Content Type", () => {
            it("Then it should math snapshot", () => {
                const json = renderer.create(<SearchComponent {...propsMockContentType} />);

                expect(json).toMatchSnapshot();
            });
        });
    });

    describe("Scenario: User Interaction", () => {
        let wrapper;

        beforeAll(() => {
            wrapper = shallow(<SearchComponent {...propsMockCategoryOnly} />);
        });

        describe("When category is clicked", () => {
            it("Then it should call the click handler property", () => {
                const tabs = wrapper.find("CategoriesTabs");

                tabs.simulate("click");

                expect(propsMock.categoryEvents.onCategoryTabClick).toHaveBeenCalled();
            });
        });

        describe("When keyword related suggestion is clicked", () => {
            it("Then it should call the related suggestion click handler property", () => {
                const tabs = wrapper.find("ResultsCount");

                tabs.simulate("relatedSuggestionClick");

                expect(propsMock.resultsEvents.onRelatedSuggestionClick).toHaveBeenCalled();
            });
        });
    });
});