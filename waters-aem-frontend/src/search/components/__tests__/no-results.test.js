import React from 'react';
import renderer from 'react-test-renderer';
import NoResults from '../no-results';

describe('Feature: NoResults React Component', () => {
    describe('Scenario: Rendering', () => {
        describe('When the component renders with props', () => {
            it('Then the snapshot should match', () => {
                const searchText = {
                    noResultsIcon: 'PATH_TO_ICON',
                    noResultsTitle: 'TITLE',
                    noResultsDescription: 'DESCRIPTION',
                    noResultsSearchLinkText: 'LINK_TEXT'
                };
                const query = "QUERY";
                const json = renderer.create(<NoResults searchText={searchText} query={query} />);

                expect(json).toMatchSnapshot();
            });
        });
    });
});