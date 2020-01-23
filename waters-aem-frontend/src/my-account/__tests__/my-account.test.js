import React from 'react';
import renderer from 'react-test-renderer';
import MyAccount from '../myaccount';
import props from '../__mocks__/en_US/my-account-json';

describe('Feature: My Account Component', () => {
    describe('Scenario: Rendering', () => {
        describe('When all props are present', () => {
            it('Then the snapshot should match', () => {
                const json = renderer.create(<MyAccount {...props} />);
				expect(json).toMatchSnapshot();
            });
        });
    });
});
