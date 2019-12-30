import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../loading';

describe("Feature: Loading Component", () => {
    beforeAll(() => {
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        jest.mockRestoreAll();
    });

    describe("Scenario: Rendering", () => {
        describe("When not visible", () => {
            it("Then it should not show the spinner", () => {
                const wrapper = shallow(<Loading visible={false} />);
                const spinner = wrapper.find("LoadingSpinner");

                expect(spinner.exists()).toEqual(false);
            });
        });

        describe("When visible", () => {
            it("Then it should show the spinner", () => {
                const wrapper = shallow(<Loading visible={true} />);
                const spinner = wrapper.find("LoadingSpinner");

                expect(spinner.exists()).toEqual(true);
            });
        });
    });
});