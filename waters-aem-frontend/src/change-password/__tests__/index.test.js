import React from 'react';
import { shallow } from 'enzyme';

import ChangePassword from "../index";

import DefaultProps from '../__mocks__/en_US/index';

const keys = {
    "tile": '.cmp-detail-tiles-list--tile'
};

const buildShallowWrapper = (Component, props) => {
	const wrapper = shallow(<Component {...props} />);
	return wrapper;
};

describe('Feature: Change Password Component', () => {
    describe('Scenario: Rendering Change Password Tile', () => {
        describe('When props are present', () => {
            let wrapper;
            beforeAll(() => {
                document.body.innerHTML =
                '<script type="application/json" id="cmp-detail-tiles--changePassword">' +
                    JSON.stringify(DefaultProps.html) +
                '</script>';

                wrapper = buildShallowWrapper(ChangePassword, DefaultProps);
            });

            it('Then the component should render', () => {
                expect(wrapper).toBeDefined();
            });
        });
    });
});