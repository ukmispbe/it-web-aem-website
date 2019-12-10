import React from "react";
import props, { facets } from '../../__mocks__/en_US/';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { KeywordTag, ContentTypeTag, SubFacetTags } from '../filter-tags';

describe("Feature: Filter Tags", () => {
    describe("Scenario: Clear all tag", () => {});

    describe("Scenario: Keyword tag", () => {
        const mockProps = {
            keyword: 'milk',
            onRemove: jest.fn(),
            text: props.searchText
        };

        describe('When keyword is specified', () => {
            it('Then it should match snapshot', () => {
                const json = renderer.create(<KeywordTag {...mockProps} />);

                expect(json).toMatchSnapshot();
            });
        });

        describe('When keyword is removed', () => {
            it('Then is should call the remove handler property', () => {
                const spy = spyOn(mockProps, 'onRemove');
                const wrapper = shallow(<KeywordTag {...mockProps} />);
                const tag = wrapper.find('a');

                tag.simulate('click');

                expect(spy).toHaveBeenCalled();

                spy.mockRestore();
            });
        });
    });

    describe("Scenario: Content type tag", () => {
        const mockProps = {
            text: props.searchText,
            selected: {},
            onRemove: jest.fn()
        };

        const mockPropsWithSelected = {
            text: props.searchText,
            selected: {
                facetName: "applicationnote_facet",
                facetTranslation: "Application Note",
                facetValue: "Application Note"
            },
            onRemove: jest.fn()
        };

        describe('When content type is not selected', () => {
            it('Then is should match spanshot', () => {
                const json = renderer.create(<ContentTypeTag {...mockProps} />);

                expect(json).toMatchSnapshot();
            });
        });

        describe('When content type is selected', () => {
            it('Then it should match snapshot', () => {
                const json = renderer.create(<ContentTypeTag {...mockPropsWithSelected} />);

                expect(json).toMatchSnapshot();
            });
        });

        describe('When content type is removed', () => {
            it('Then it should call the remove handler property', () => {
                const spy = spyOn(mockPropsWithSelected, 'onRemove');
                const wrapper = shallow(<ContentTypeTag {...mockPropsWithSelected} />);
                const tag = wrapper.find('a');

                tag.simulate('click');

                expect(spy).toHaveBeenCalled();

                spy.mockRestore();
            });
        });
    });

    describe("Scenario: Sub facet tags", () => {
        const mockProps = {
            text: props.searchText,
            selectedFacets: {},
            facets: null,
            removeTag: jest.fn(),
            filterMap: props.filterMap,
            defaultFacet: 'applicationnote'
        };

        const mockPropsWithOneFacet = {
            ...mockProps,
            facets,
            selectedFacets: {
                columntype_facet: ['HPLC']
            }
        };

        const mockPropsWithMultipleFacet = {
            ...mockProps,
            facets,
            selectedFacets: {
                columntype_facet: ['HPLC', 'Preparative HPLC'],
                market_facet: ['Chemical Analysis', 'Pharmaceutical']
            }
        };

        describe('When no facets are selected', () => {
            it('Then it should match snapshot', () => {
                const json = renderer.create(<SubFacetTags {...mockProps} />);
                
                expect(json).toMatchSnapshot();
            });
        });

        describe('When one facet is selected', () => {
            it('Then it should match snapshot', () => {
                const json = renderer.create(<SubFacetTags {...mockPropsWithOneFacet} />);

                expect(json).toMatchSnapshot();
            });
        });

        describe('When multiple facets are selected', () => {
            it('Then it should match snapshot', () => {
                const json = renderer.create(<SubFacetTags {...mockPropsWithMultipleFacet} />);

                expect(json).toMatchSnapshot();
            });
        });

        describe('When facet is removed', () => {
            it('Then is should call the remove handler property', () => {
                const spy = spyOn(mockPropsWithOneFacet, 'removeTag');
                const wrapper = shallow(<SubFacetTags {...mockPropsWithOneFacet} />);
                const tag = wrapper.find('a');
                tag.simulate('click');

                expect(spy).toHaveBeenCalled();

                spy.mockRestore();
            });
        });
    });
});