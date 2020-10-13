import React from 'react';
import { shallow } from 'enzyme';

import ChangePassword from "../index";

import DefaultProps from '../__mocks__/en_US/index';
import props from "../../my-account/__mocks__/en_US/my-account-json";

const keys = {
    "tile": '.cmp-detail-tiles-list--tile'
};

const buildShallowWrapper = (Component, configId, configs) => {
	const wrapper = shallow(<Component configId={configId} configs={configs} />);
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
                '</script>' +
                '<script type="application/json" id="cmp-my-account">' +
                    JSON.stringify(props) +
                '</script>';

                wrapper = buildShallowWrapper(ChangePassword, DefaultProps.configId, props.myProfile);
            });

            it('Then the component should render', () => {
                expect(wrapper).toBeDefined();
            });
        });
    });
});