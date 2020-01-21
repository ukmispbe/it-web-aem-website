jest.mock('../../utils/modal/modal-portal');

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import WeChat, { weChatLinkClass } from '../index';

//Mocked Props
import DefaultProps from '../__mocks__/zh_CN/index';

describe('Feature: We Chat Component', () => {
    describe('Scenario Rendering We Chat in visible state', () => {

        describe('When rendering We Chat with the modal closed', () => {
            it('Then the snapshot should match', () => {
                const component = renderer.create(
                    <WeChat config={{ ...DefaultProps }} />
                );

                const root = component.root;
                const instance = root.instance;
                instance.setState({ isModalShown: true });
                expect(component).toMatchSnapshot();
            });
        });

        describe('When rendering We Chat with the modal open', () => {
            it('Then the snapshot should match', () => {
                const component = renderer.create(
                    <WeChat config={{ ...DefaultProps }} />
                );

                const root = component.root;
                const instance = root.instance;
                instance.setState({ isModalShown: false });
                expect(component).toMatchSnapshot();
            });
        });

        describe('When the We Chat social icon is clicked', () => {
            it('Then expect is to have been called and change modal state', () => {

                const component = shallow(<WeChat config={{ ...DefaultProps }} />);
                const weChatInstance = component.instance();
                const spyToggleModal = jest.spyOn(weChatInstance, 'toggleModal');
                const button = component.find(`.${weChatLinkClass}`)

                button.simulate('click', {
                    preventDefault: jest.fn(() => {})
                })

                expect(spyToggleModal).toHaveBeenCalled();
                expect(weChatInstance.state.isModalShown).toEqual(true);

            });
        });

    });
});
