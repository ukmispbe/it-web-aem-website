import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import MyAccount from '../index';

const keys = {
    myAccount: '.cmp-my-account',
    myAccountTiles: '.cmp-my-account-tiles'
};

//Mocked Props
import DefaultProps from '../__mocks__/en_US/my-account-json';

const buildShallowWrapper = (Component, props, mockValues = undefined) => {
    if (Array.isArray(mockValues)) {
		setMockValues(mockValues);
	}
	const wrapper = shallow(<Component {...props} />);
	return wrapper;
};

describe('Feature: My Account Component', () => {
    describe('Scenario: Rendering My Account', () => {
        describe('When all props are present', () => {
            let wrapper;
            let myAccount, myAccountTiles;

            beforeAll(() => {
                wrapper = buildShallowWrapper(
                    MyAccount,
                    DefaultProps
                );

                myAccount = wrapper.find(keys.myAccount);
                myAccountTiles = myAccount.find(keys.myAccountTiles);
            });

            it('Then it should render the my account component', () => {
                expect(myAccount.length).toEqual(1);
            });

            it('Then it should render the tiles', () => {
                expect(myAccountTiles.length).toEqual(1);

                let tilesWrapper = myAccountTiles.first();
                expect(tilesWrapper.children().length).toEqual(DefaultProps.tiles.length);
            });
        });
    });

    describe('Scenario Render My Account and check snapshots', () => {
        describe('When all props are present', () => {
            it('Then the snapshot should match', () => {
                const json = renderer.create(<MyAccount {...DefaultProps} />);
				expect(json).toMatchSnapshot();
            });
        });
    });
});
