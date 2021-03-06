import React from 'react';
import renderer from 'react-test-renderer';
import MyAccount from '../myaccount';
import props from '../__mocks__/en_US/my-account-json';
import Ecommerce from "../../scripts/ecommerce";
import mockBodyHTML from '../../__mocks__/en_US/html/mock-body-html'

describe('Feature: My Account Component', () => {
    document.body.innerHTML = mockBodyHTML;

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('Scenario: Rendering', () => {
        describe('When ecommerce is not disabled', () => {
            it('Then the snapshot should match', () => {
                const json = renderer.create(<MyAccount {...props} />);
				expect(json).toMatchSnapshot();
            });
        });

        describe("when ecommerce is disabled", () => {
            it("Then the snapshot should match", () => {
                Ecommerce.isDisabledState = jest.fn(() => true);

                const json = renderer.create(<MyAccount {...props} />);
				expect(json).toMatchSnapshot();
            });
        });
    });
});
