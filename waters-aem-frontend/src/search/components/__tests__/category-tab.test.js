import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import screenSizes from '../../../scripts/screenSizes';
import CategoryTab from '../category-tab';

describe('Feature: CategoryTab React Component', () => {
    const props = {
        name: 'Tab1',
        translation: 'Tab Uno',
        count: 0,
        isActive: false,
        index: 0,
        onClick: jest.fn(() => {})
    };

    describe('Scenario: Rendering', () => {
        describe('When the screen size is tablet or mobile', () => {
            it('Then it should not render anything and match snapshot', () => {
                screenSizes.isTabletAndUnder = jest.fn(() => true);
                const json = renderer.create(<CategoryTab {...props}/>);
                expect(json).toMatchSnapshot();
            });
        });

        describe('When the screen size is desktop and tab is inactive', () => {
            it('Then is should render the component and match snapshot', () => {
                screenSizes.isTabletAndUnder = jest.fn(() => false);
                const json = renderer.create(<CategoryTab {...props}/>);
                expect(json).toMatchSnapshot();
            });
        });

        describe('When the screen size is desktop and tab is active', () => {
            it('Then is should render the component and match snapshot', () => {
                props.isActive = true;
                screenSizes.isTabletAndUnder = jest.fn(() => false);
                const json = renderer.create(<CategoryTab {...props}/>);
                expect(json).toMatchSnapshot();
            });
        });
    });

    describe('Scenario: User Interaction', () => {
        describe('When the tab is clicked', () => {
            it('It should execute the onClick prop', () => {
                screenSizes.isTabletAndUnder = jest.fn(() => false);
                const onClickSpy = spyOn(props, 'onClick');
                const wrapper = shallow(<CategoryTab {...props} />);
                wrapper.find('.cmp-search__categories-tabs--tab').simulate('click');

                expect(onClickSpy).toHaveBeenCalled();

                onClickSpy.mockRestore();
            });
        });
    });
});