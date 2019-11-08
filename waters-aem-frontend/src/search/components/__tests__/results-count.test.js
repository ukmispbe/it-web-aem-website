import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { parameterDefaults } from '../../services';
import ResultsCount from '../results-count';

describe('Feature: ResultsCount React Component', () => {
    const props = {
        rows: parameterDefaults.rows,
        count: 0,
        query: parameterDefaults.keyword,
        current: parameterDefaults.page,
        noQuery: true,
        spell_related_suggestions: [],
        spell_suggestion: '',
        onRelatedSuggestionClick: jest.fn(() => {}),
        text: {
          resultsText: 'Showing {startResults}-{endResults} of {count} results '
        }
    };

    describe('Scenario: Rendering', () => {
        describe('When the number of results is higher than the allowed page count', () => {
            it('Then the snapshot should match', () => {
                props.count = props.rows + 1;

                const json = renderer.create(<ResultsCount {...props} />);
                expect(json).toMatchSnapshot();
            });
        });

        describe('When the number of results is less than the allowed page count', () => {
            it('Then the snapshot should match', () => {
                props.count = props.rows - 1;

                const json = renderer.create(<ResultsCount {...props} />);
                expect(json).toMatchSnapshot();
            });
        });

        describe('When keyword is not provided', () => {
            it('Then the snapshot should match', () => {
                props.noQuery = false;
                props.query = parameterDefaults.keyword;

                const json = renderer.create(<ResultsCount {...props} />);
                expect(json).toMatchSnapshot();
            });
        });

        describe('When keyword is provided without spelling suggestion', () => {
            it('Then the snapshot should match', () => {
                props.query = 'milk';

                const json = renderer.create(<ResultsCount {...props} />);
                expect(json).toMatchSnapshot();
            });
        });

        describe('When keyword is provided with spelling suggestion', () => {
            it('Then the snapshot should match', () => {
                props.query = 'milk';
                props.spell_suggestion = 'got milk?';

                const json = renderer.create(<ResultsCount {...props} />);
                expect(json).toMatchSnapshot();
            });
        });

        describe('When one related keyword is provided', () => {
            it('Then the snapshot should match', () => {
                props.query = 'milk';
                props.spell_related_suggestions = ['... it does a body good!'];

                const json = renderer.create(<ResultsCount {...props} />);
                expect(json).toMatchSnapshot();
            });
        });

        describe('When more than one related keyword is provided', () => {
            it('Then the snapshot should match', () => {
                props.query = 'milk';
                props.spell_related_suggestions = ['... it does a body good!', 'milkyway'];

                const json = renderer.create(<ResultsCount {...props} />);
                expect(json).toMatchSnapshot();
            });
        });
    });

    describe('Scenario: User Interaction', () => {
        describe('When related suggestion is clicked', () => {
            it('Then the props click event handler should be called', () => {
                props.query = 'milk';
                props.spell_related_suggestions = ['... it does a body good!'];
                
                const spyOnHanlder = spyOn(props, 'onRelatedSuggestionClick');

                const wrapper = shallow(<ResultsCount {...props} />);

                wrapper.find('.cmp-search__related-suggestions .item').simulate('click');

                expect(spyOnHanlder).toHaveBeenCalled();

                spyOnHanlder.mockRestore();
            });
        });
    });
});