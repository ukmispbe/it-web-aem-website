import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import props from '../__mocks__/en_US/';
import { defaultProps } from '../search.component.props';
import { FilterTagList, Aside, Menu, SearchResults, ResultsContent, Pagination, ResultsBody } from '../search.component.helpers';
import data from '../services/__mocks__/data';
import { parameterDefaults } from '../services/index';

describe("Feature: ResultsBody Component", () => {
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
        text: props.searchText, 
        filterMap: props.filterMap,
        skuConfig: props.skuConfig,
        searchParams: defaultProps.searchParams,
        categoryProps: defaultProps.categoryProps, 
        categoryEvents: {
            onCategoryTabClick: jest.fn(),
            onCategoryDropdownChange: jest.fn(),
        },
        showSortFilterProps: defaultProps.showSortFilterProps,
        showSortFilterEvents: {
            onSetupFilters: jest.fn(),
            onResetToSavedState: jest.fn(),
            onClose: jest.fn()
        },
        filterTagsProps: defaultProps.filterTagsProps,
        filterTagsEvents: {
            onClearAll: jest.fn(),
            onKeywordRemove: jest.fn(),
            onContentTypeRemove: jest.fn(),
            onSubFacetRemove: jest.fn()
        },
        resultsProps: defaultProps.resultsProps,
        resultsEvents: {
            onRelatedSuggestionClick: jest.fn(),
            onResultsItemClick: jest.fn(),
            onPageChange: jest.fn()
        }
    }

    const propsMockSortByBestMatch = {
        ...propsMock,
        asideProps: {
            ...defaultProps.asideProps,
            sortByText: "most-relevant"
        }
    };

    const propsMockSortByMostRecent = {
        ...propsMock,
        asideProps: {
            ...defaultProps.asideProps,
            sortByText: "most-recent"
        }
    };

    describe("Scenario: Rendering", () => {
        describe("When sorting by best match", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<ResultsBody {...propsMockSortByBestMatch} />);

                expect(json).toMatchSnapshot();
            })
        });

        describe("When sorting by most recent", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<ResultsBody {...propsMockSortByMostRecent} />);

                expect(json).toMatchSnapshot();
            });
        });
    });

    describe("Scenario: User Interaction", () => {
        let wrapper;

        beforeAll(() => {
            wrapper = shallow(<ResultsBody {...propsMockSortByBestMatch} />);
        });

        describe("When category dropdown value is changed", () => {

            it("Then is should call the change handler property", () => {
                const dropdown = wrapper.find("CategoryDropdown");

                dropdown.props().categoryOnChange();

                expect(propsMockSortByBestMatch.categoryEvents.onCategoryDropdownChange).toHaveBeenCalled();
            });
        });

        describe("When show sort filter is clicked", () => {
            it("Then it should call the setup filters handler property", () => {
                const button = wrapper.find("ShowSortFilter");

                button.props().setupFilters();
                
                expect(propsMockSortByBestMatch.showSortFilterEvents.onSetupFilters).toHaveBeenCalled();
            });
        });

        describe("When canceling show sort filter modal", () => {
            it("Then it should call the reset save state handler property", () => {
                const button = wrapper.find("ShowSortFilter");

                button.props().resetToSavedState();

                expect(propsMockSortByBestMatch.showSortFilterEvents.onResetToSavedState).toHaveBeenCalled();
            });
        });

        describe("When sort filter modal is closed", () => {
            it("Then it should call the close handler property", () => {
                const button = wrapper.find("ShowSortFilter");

                button.simulate("close");

                expect(propsMockSortByBestMatch.showSortFilterEvents.onClose).toHaveBeenCalled();
            });
        });
    });
});


describe("Feature: Pagination Component", () => {
    const propsMockNoPagination = {
        nextIcon: props.searchText.nextIcon,
        previousIcon: props.searchText.previousIcon,
        resultsProps: {
            ...defaultProps.resultsProps,
            count: parameterDefaults.rows - 1
        },
        resultsEvents: {
            onRelatedSuggestionClick: jest.fn(),
            onResultsItemClick: jest.fn(),
            onPageChange: jest.fn()
        }
    }

    const propsMockPagination = {
        nextIcon: props.searchText.nextIcon,
        previousIcon: props.searchText.previousIcon,
        resultsProps: {
            ...defaultProps.resultsProps,
            count: parameterDefaults.rows + 1,
            pagination: {
                current: 1
            }
        },
        resultsEvents: {
            onRelatedSuggestionClick: jest.fn(),
            onResultsItemClick: jest.fn(),
            onPageChange: jest.fn()
        }
    }

    const propsMockPaginationWithoutCurrentPage = {
        nextIcon: props.searchText.nextIcon,
        previousIcon: props.searchText.previousIcon,
        resultsProps: {
            ...defaultProps.resultsProps,
            count: parameterDefaults.rows + 1,
            pagination: {
                current: null
            }
        },
        resultsEvents: {
            onRelatedSuggestionClick: jest.fn(),
            onResultsItemClick: jest.fn(),
            onPageChange: jest.fn()
        }
    }

    describe("Scenario: Rendering", () => {
        describe("When the number of results is less than the number of items per page", () => {
            it("Then it should not contain pagination", () => {
                const wrapper = shallow(<Pagination {...propsMockNoPagination} />);
                const paginate = wrapper.find("PaginationBoxView");

                expect(paginate.exists()).toEqual(false);
            });
        });

        describe("When the number of results is more than the number of items per page", () => {
            it("Then it should contain pagination", () => {
                const wrapper = shallow(<Pagination {...propsMockPagination} />);
                const paginate = wrapper.find("PaginationBoxView");

                expect(paginate.exists()).toEqual(true);
            });
        });

        describe("When the current page is not specified", () => {
            it("Then it should force the page to zero", () => {
                const wrapper = shallow(<Pagination {...propsMockPaginationWithoutCurrentPage} />);
                const paginate = wrapper.find("PaginationBoxView");

                expect(paginate.props().forcePage).toEqual(0);
                expect(paginate.props().initialPage).toEqual(0);
            });
        });
    });

    describe("Scenario: User Interaction", () => {
        describe("When changing page", () => {
            it("Then it should call the page change handler property", () => {
                const wrapper = shallow(<Pagination {...propsMockPagination} />);
                const paginate = wrapper.find("PaginationBoxView");

                paginate.simulate("pageChange");

                expect(propsMockPagination.resultsEvents.onPageChange).toHaveBeenCalled();
            });
        });
    });
});

describe("Feature: ResultsContent Component", () => {
    afterAll(() => {
        jest.mockRestoreAll();
    });

    const propsMockLibraryResults = {
        text: props.searchText,
        skuConfig: props.skuConfig,
        searchParams: {
            ...defaultProps.searchParams,
            page: 1
        },
        resultsProps: {
            ...defaultProps.resultsProps,
            isSkuList: false,
            items: {
                "1": data.library.results.documents
            }
        },
        resultsEvents: {
            onRelatedSuggestionClick: jest.fn(),
            onResultsItemClick: jest.fn(),
            onPageChange: jest.fn()
        }
    };

    const propsMockSkuResults = {
        ...propsMockLibraryResults,
        resultsProps: {
            ...defaultProps.resultsProps,
            isSkuList: true,
            items: {
                "1": data.shop.results.documents
            }
        }
    };

    describe("Scenario: Rendering", () => {
        describe("When displaying the shop results", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<ResultsContent {...propsMockSkuResults} />);
                
                expect(json).toMatchSnapshot();
            });
        });

        describe("When displaying the library results", () => {
            it("Then it should display the SearchResults component", () => {
                const wrapper = shallow(<ResultsContent {...propsMockLibraryResults} />);
                const result = wrapper.find("SearchResults");

                expect(result.exists()).toEqual(true);
            });
        });
    });

    describe("Scenario: User Interaction", () => {
        describe("When sku item is clicked", () => {
            it("Then it should call the item click handler property", () => {
                const wrapper = shallow(<ResultsContent {...propsMockSkuResults} />);
                const result = wrapper.find("SearchResults");

                result.simulate("itemClick");

                expect(propsMockSkuResults.resultsEvents.onResultsItemClick).toHaveBeenCalled();
            });
        });

        describe("When library item is clicked", () => {
            it("Then it should call the item click handler property", () => {
                const wrapper = shallow(<ResultsContent {...propsMockLibraryResults} />);
                const result = wrapper.find("SearchResults");

                result.simulate("itemClick");

                expect(propsMockLibraryResults.resultsEvents.onResultsItemClick).toHaveBeenCalled();
            });
        });
    });
});

describe("Feature: SearchResults Component", () => {
    const propsMockNullItems = {
        items: {},
        skuConfig: props.skuConfig,
        onItemClick: jest.fn()
    }

    const propsMockNoItems = {
        items: [],
        skuConfig: props.skuConfig,
        onItemClick: jest.fn()
    }

    const propsMockWithItems = {
        ...propsMockNoItems,
        items: data.shop.results.documents
    }

    describe("Scenario: Rendering", () => {
        describe("When the results is not an array", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<SearchResults {...propsMockNullItems} />);

                expect(json).toMatchSnapshot();
            });
        });

        describe("When there are no resuilts", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<SearchResults {...propsMockNoItems} />);

                expect(json).toMatchSnapshot();
            });
        });

        describe("Where there are results", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<SearchResults {...propsMockWithItems} />);

                expect(json).toMatchSnapshot();
            });
        });
    });

    describe("Scenario: User Interaction", () => {
        describe("When item is clicked", () => {
            it("Then it should call the click handler property", () => {
                const wrapper = shallow(<SearchResults {...propsMockWithItems} />);
                const results = wrapper.find("SkuList");

                results.simulate("itemClick");

                expect(propsMockWithItems.onItemClick).toHaveBeenCalled();
            });
        });
    });
});

describe("Feature: Menu Component", () => {
    const propsMock = {
        text: props.searchText,
        filterMap: props.filterMap,
        menuProps: defaultProps.menuProps, 
        contentTypeMenuProps: defaultProps.contentTypeMenuProps,
        contentTypeMenuEvents: {
            onContentTypeItemClick: jest.fn()
        },
        facetMenuProps: defaultProps.facetMenuProps,
        facetMenuEvents: {
            onContentTypeRemoval: jest.fn()
        },
        subFacetFiltersProps: defaultProps.subFacetFiltersProps,
        subFacetFiltersEvents: {
            onFilterSelect: jest.fn(),
            onGroupClick: jest.fn()
        },
        filterTagsProps: defaultProps.filterTagsProps,
        filterTagsEvents: {
            onClearAll: jest.fn(),
            onKeywordRemove: jest.fn(),
            onContentTypeRemove: jest.fn(),
            onSubFacetRemove: jest.fn()
        }
    };

    const propsMockContentTypeMenu = {
        ... propsMock,
        menuProps: {
            showContentTypeMenu: true,
            showFacetMenu: false,
            heading: 'filter By'
        }
    };

    const propsMockFacetMenu = {
        ... propsMock,
        menuProps: {
            showContentTypeMenu: false,
            showFacetMenu: true,
            heading: 'filter By'
        }
    };

    describe("Scenario: Rendering", () => {
        describe("When showing the content type menu", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<Menu {...propsMockContentTypeMenu} />);

                expect(json).toMatchSnapshot();
            });

            it("And it should contain the content type menu", () => {
                const wrapper = shallow(<Menu {...propsMockContentTypeMenu} />);
                const menu = wrapper.find("ContentTypeMenu");

                expect(menu.exists()).toEqual(true);
            });
        });

        describe("When showing facet menu", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<Menu {...propsMockFacetMenu} />);

                expect(json).toMatchSnapshot();
            });

            it("And it should contain the facet menu", () => {
                const wrapper = shallow(<Menu {...propsMockFacetMenu} />);
                const menu = wrapper.find("FacetMenu");
                const filter = menu.find("Filter");

                expect(menu.exists()).toEqual(true);
                expect(filter.exists()).toEqual(true);
            });
        });
    });

    describe("Scenario: User Interaction", () => {
        describe("When content type is clicked", () => {
            it("Then it should call the content type click handler property", () => {
                const wrapper = shallow(<Menu {...propsMockContentTypeMenu} />);
                const menu = wrapper.find("ContentTypeMenu");

                menu.simulate("click");

                expect(propsMockContentTypeMenu.contentTypeMenuEvents.onContentTypeItemClick).toHaveBeenCalled();
            });
        });

        describe("When facet menu is cleared", () => {
            it("Then it should call the clear handler property", () => {
                const wrapper = shallow(<Menu {...propsMockFacetMenu} />);
                const menu = wrapper.find("FacetMenu");

                menu.simulate("clear");

                expect(propsMockFacetMenu.facetMenuEvents.onContentTypeRemoval).toHaveBeenCalled();
            });
        });

        describe("When facet group is clicked", () => {
            it("Then it should call the group click handler property", () => {
                const wrapper = shallow(<Menu {...propsMockFacetMenu} />);
                const filter = wrapper.find("Filter");

                filter.simulate("groupClick");

                expect(propsMockFacetMenu.subFacetFiltersEvents.onGroupClick).toHaveBeenCalled();
            });
        });

        describe("When sub facet is selected", () => {
            it("Then it should call the select facet handler property", () => {
                const wrapper = shallow(<Menu {...propsMockFacetMenu} />);
                const filter = wrapper.find("Filter");

                filter.props().selectHandler();
                
                expect(propsMockFacetMenu.subFacetFiltersEvents.onFilterSelect).toHaveBeenCalled();
            });
        });
    });
});

describe("Feature: Aside Component", () => {
    const propsMocked = {
        text: {...props.searchText},
        asideProps: defaultProps.asideProps,
        asideEvents: {
            onHideSortFilterClick: jest.fn(),
            onApplySortFilter: jest.fn(),
            onCollapseFilters: jest.fn(),
            onSort: jest.fn()
        }
    };

    describe("Scenario: Rendering", () => {
        describe("When no children are provided", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<Aside {...propsMocked} />);

                expect(json).toMatchSnapshot();
            });
        });

        describe("When children are provided", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<Aside {...propsMocked}><div className="child"></div></Aside>);

                expect(json).toMatchSnapshot();
            });
        });
    });

    describe("Scenario: User Interaction", () => {
        let wrapper;

        beforeAll(() => {
            wrapper = shallow(<Aside {...propsMocked} />);
        });

        describe("When hide button is clicked", () => {
            it("Then it should call the hide handler property", () => {
                const button = wrapper.find("HideSortFilter");

                button.simulate("click");

                expect(propsMocked.asideEvents.onHideSortFilterClick).toHaveBeenCalled();
            });
        });

        describe("When apply button is clicked", () => {
            it("Then it should call the apply handler property", () => {
                const button = wrapper.find("ApplySortFilter");

                button.props().applyFilters();

                expect(propsMocked.asideEvents.onApplySortFilter).toHaveBeenCalled();
            });
        });

        describe("When done button is clicked", () => {
            it("Then it should call the collapse filters handler property", () => {
                const button = wrapper.find("DoneSortFilter");

                button.props().collapseFilters();

                expect(propsMocked.asideEvents.onCollapseFilters).toHaveBeenCalled();
            });
        });

        describe("When sort is changed", () => {
            it("Then it should call the sort handler property", () => {
                const sort = wrapper.find("Sort");

                sort.props().sortHandler();

                expect(propsMocked.asideEvents.onSort).toHaveBeenCalled();
            });
        });
    });
});

describe('Feature: FilterTagList Component', () => {
    const propsWithNoFilters = {
        text: { ... props.searchText },
        filterMap: { ... props.filterMap },
        filterTagsProps: { ... defaultProps.filterTagsProps },
        filterTagsEvents: { ... defaultProps.filterTagsEvents }
    };

    const propsWithKeyword = {
        text: { ... props.searchText },
        filterMap: { ... props.filterMap },
        filterTagsProps: {
            keyword: "hplc",
            contentTypeSelected: {},
            selectedFacets: {}
        },
        filterTagsEvents: { ... defaultProps.filterTagsEvents }
    };

    const propsWithKeywordSpellingSuggestion = {
        text: { ... props.searchText },
        filterMap: { ... props.filterMap },
        filterTagsProps: {
            keyword: "hp1c",
            spell_suggestion: "HPLC",
            contentTypeSelected: {},
            selectedFacets: {}
        },
        filterTagsEvents: { ... defaultProps.filterTagsEvents }
    };

    const propsWithContentType = {
        text: { ... props.searchText },
        filterMap: { ... props.filterMap },
        filterTagsProps: {
            keyword: "",
            contentTypeSelected: {
                facetName: "applicationnote_facet", 
                facetValue: "Application Note", 
                facetTranslation: "Application Note"
            },
            selectedFacets: {}
        },
        filterTagsEvents: { ... defaultProps.filterTagsEvents }
    };

    const propsWithSubFacets = {
        text: { ... props.searchText },
        filterMap: [],
        filterTagsProps: {
            keyword: "",
            contentTypeSelected: {
                facetName: "applicationnote_facet", 
                facetValue: "Application Note", 
                facetTranslation: "Application Note"
            },
            selectedFacets: {
                separationmode_facet: ["Reversed-phase"]
            }
        },
        filterTagsEvents: { ... defaultProps.filterTagsEvents }
    };

    const propsWithAllFilters = {
        text: { ... props.searchText },
        filterMap: [],
        filterTagsProps: {
            keyword: "hplc",
            contentTypeSelected: {
                facetName: "applicationnote_facet", 
                facetValue: "Application Note", 
                facetTranslation: "Application Note"
            },
            selectedFacets: {
                separationmode_facet: ["Reversed-phase"]
            }
        },
        filterTagsEvents: { 
            onClearAll: jest.fn(),
            onKeywordRemove: jest.fn(),
            onContentTypeRemove: jest.fn(),
            onSubFacetRemove: jest.fn()
        }
    };

    describe('Scenario: Rendering', () => {
        describe('When no filters are specified', () => {
            let wrapper;

            beforeAll(() => {
                wrapper = shallow(<FilterTagList {...propsWithNoFilters} />);
            });

            it('Then it should match snapshot', () => {
                const json = renderer.create(<FilterTagList {...propsWithNoFilters} />);

                expect(json).toMatchSnapshot();
            });

            it('And it should not contain a keyword tag', () => {
                const tag = wrapper.find('KeywordTag');

                expect(tag.exists()).toEqual(false);
            });

            it('And it should not contain a content type tag', () => {
                const tag = wrapper.find('ContentTypeTag');

                expect(tag.exists()).toEqual(false);
            });

            it('And it should not contain sub facet tags', () => {
                const tag = wrapper.find('SubFacetTags');

                expect(tag.exists()).toEqual(false);
            });

            it('And it should not contain a clear all tag', () => {
                const tag = wrapper.find('ClearAllTag');

                expect(tag.exists()).toEqual(false);
            });
        });

        describe('When keyword filter is specified', () => {
            let wrapper;

            beforeAll(() => {
                wrapper = shallow(<FilterTagList {...propsWithKeyword} />);
            });

            it('Then it should match spapshot', () => {
                const json = renderer.create(<FilterTagList {...propsWithKeyword} />);

                expect(json).toMatchSnapshot();
            });

            it('And it should contain a keyword tag', () => {
                const tag = wrapper.find('KeywordTag');

                expect(tag.exists()).toEqual(true);
            });

            it('And it should contain a clear all tag', () => {
                const tag = wrapper.find('ClearAllTag');

                expect(tag.exists()).toEqual(true);
            });
        });

        describe('When keyword spelling suggestion is specified', () => {
            let wrapper;

            beforeAll(() => {
                wrapper = shallow(<FilterTagList {...propsWithKeywordSpellingSuggestion} />);
            });

            it('Then it should match spapshot', () => {
                const json = renderer.create(<FilterTagList {...propsWithKeywordSpellingSuggestion} />);

                expect(json).toMatchSnapshot();
            });

            it('And it should contain a keyword tag', () => {
                const tag = wrapper.find('KeywordTag');

                expect(tag.exists()).toEqual(true);
            });

            it('And it should contain a clear all tag', () => {
                const tag = wrapper.find('ClearAllTag');

                expect(tag.exists()).toEqual(true);
            });
        });

        describe('When content type filter is specified', () => {
            let wrapper;

            beforeAll(() => {
                wrapper = shallow(<FilterTagList {...propsWithContentType} />);
            });

            it("Then is should match snapshot", () => {
                const json = renderer.create(<FilterTagList {...propsWithContentType} />);

                expect(json).toMatchSnapshot();
            });

            it("And it should contain a content type tag", () => {
                const tag = wrapper.find('ContentTypeTag');

                expect(tag.exists()).toEqual(true);
            });

            it('And it should contain a clear all tag', () => {
                const tag = wrapper.find('ClearAllTag');

                expect(tag.exists()).toEqual(true);
            });
        });

        describe("When sub facet filters are specified", () => {
            let wrapper;

            beforeAll(() => {
                wrapper = shallow(<FilterTagList {...propsWithSubFacets} />);
            });

            it("Then it should match snapshot", () => {
                const json = renderer.create(<FilterTagList {...propsWithSubFacets} />);

                expect(json).toMatchSnapshot();
            });

            it("And it should contain a sub facet tag", () => {
                const tag = wrapper.find('SubFacetTags');

                expect(tag.exists()).toEqual(true);
            });

            it("And it should contain a content type tag", () => {
                const tag = wrapper.find('ContentTypeTag');

                expect(tag.exists()).toEqual(true);
            });

            it('And it should contain a clear all tag', () => {
                const tag = wrapper.find('ClearAllTag');

                expect(tag.exists()).toEqual(true);
            });
        });
    });

    describe('Scenario: User Interaction', () => {
        let wrapper;

        beforeAll(() => {
            wrapper = shallow(<FilterTagList {...propsWithAllFilters} />);
        });

        describe("When the clear all tag is clicked", () => {
            it("Then is should call the clear all handler property", () => {
                const tag = wrapper.find('ClearAllTag');

                tag.simulate("remove");

                expect(propsWithAllFilters.filterTagsEvents.onClearAll).toHaveBeenCalled();
            });
        });

        describe("When the keyword tag is clicked", () => {
            it("Then is should call the remove keyword handler property", () => {
                const tag = wrapper.find('KeywordTag');

                tag.simulate("remove");

                expect(propsWithAllFilters.filterTagsEvents.onKeywordRemove).toHaveBeenCalled();
            });
        });

        describe("When the content type tag is clicked", () => {
            it("Then is should call the remove content type handler property", () => {
                const tag = wrapper.find('ContentTypeTag');

                tag.simulate("remove");

                expect(propsWithAllFilters.filterTagsEvents.onContentTypeRemove).toHaveBeenCalled();
            });
        });

        describe("When the sub facet tag is clicked", () => {
            it("Then is should call the remove sub facet handler property", () => {
                const tag = wrapper.find('SubFacetTags');

                tag.props().removeTag();

                expect(propsWithAllFilters.filterTagsEvents.onSubFacetRemove).toHaveBeenCalled();
            });
        });
    });
});