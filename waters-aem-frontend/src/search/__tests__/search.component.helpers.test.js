import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import props from '../__mocks__/en_US/';
import { defaultProps } from '../search.component.props';
import { FilterTagList } from '../search.component.helpers';

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