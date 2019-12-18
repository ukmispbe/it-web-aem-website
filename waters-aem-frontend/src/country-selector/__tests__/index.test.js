import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import CountrySelector, { CountrySelection } from '../';

document.body.innerHTML = "<div class='cmp-footer__selector__region'></div><div id='modal-root'></div>"

const props = {
    countries: [{"href":"/content/waters/us/en.html","title":"United States"},{"href":"/content/waters/jp/ja.html","title":"Japan"},{"href":"/content/waters/cn/zh.html","title":"China"}],
    translations: {
        dismissButton: "Dismiss",
        cancelButton: "Cancel",
        preferredCountryHeading: "Select your Preferred Country",
        changeCountryText: "Changing the country you shop from may affect factors including account pricing, shipping options and product availability.",
        changeCountryNewTabText: "Your new country website will open in a new browser tab.",
        changeCountryNoteText: "Note'",
        changeCountryButton: "Change Country"
    },
    onClose: jest.fn()
};

describe('Feature: CountrySelector Component', () => {
    let spyOnUseEffect;

    beforeAll(() => {
        spyOnUseEffect = jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    });

    describe('Scenario: Rendering', () => {
        describe('When countries are specified', () => {
            const wrapper = mount(<CountrySelector {...props} />);

            it('Then it should contain a modal', () => {
                const modal = wrapper.find('Modal');
                
                expect(modal.exists()).toEqual(true);
            });

            it('And it should contain the country selection', () => {
                const countrySelection = wrapper.find('CountrySelector');
                
                expect(countrySelection.exists()).toEqual(true);
            });

            afterAll(() => {
                wrapper.unmount();
            });
        });
    });

    describe('Scenario: User Interaction', () => {
        const wrapper = shallow(<CountrySelector {...props} initialState={true} />);

        describe('When user closes the modal', () => {
            it('Then the open state should be set to false', () => {
                const modal = wrapper.find('Modal');

                modal.simulate('close');

                const modalUpdated = wrapper.find('Modal');

                expect(modalUpdated.props().isOpen).toEqual(false);
            });
        });

        describe('When changing country', () => {
            it('Then it should close the modal and redirect to that country', () => {
                const countrySelection = wrapper.find('CountrySelection');
                countrySelection.props().onChange({href: '/'});
                const modal = wrapper.find('Modal');
                expect(modal.props().isOpen).toEqual(false);
            });
        });
    });

    afterAll(() => {
        spyOnUseEffect.mockRestore();
    });
});

describe('Feature: CountrySelection Component', () => {
    describe('Scenario: Rendering', () => {
        describe('When countries are specified', () => {
            it('Then it should match snapshot', () => {
                const json = renderer.create(<CountrySelection {...props} />);

                expect(json).toMatchSnapshot();
            });
        });
    });

    describe('Scenario: User Interaction', () => {
        describe('When user cancels', () => {
            it('Then it should call the close handler property', () => {
                const spyOnCancel = jest.spyOn(props, 'onClose');
                const wrapper = mount(<CountrySelection {...props} />);
                const cancel = wrapper.find('.cmp-country-selector__cancel > a');

                cancel.simulate('click');

                expect(spyOnCancel).toHaveBeenCalled();
            });
        });

        describe('When user selects a country', () => {
            const selectedValue = "/content/waters/jp/ja.html";
            const setSelectedValue = jest.fn();

            beforeEach(() => {
                jest.spyOn(React, 'useState').mockImplementation((init) => [init, setSelectedValue]);
                const wrapper = mount(<CountrySelection {...props} />);
                const select = wrapper.find('.select-css');
                
                select.simulate('change', { target: { value: selectedValue }});
            });

            it('Then it should call the change handler', () => {
                expect(setSelectedValue).toHaveBeenCalledWith(selectedValue);
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });
        });
    });
});