import React, { useEffect } from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import OrderDetails from '../index';
import ErrorBoundary from '../../search';
import { getOrderDetails } from '../orderDetails.services';
import props from '../__mocks__/en_US/index';
import { orderDetailsJSON } from '../__mocks__/en_US/services-json.test';
import Spinner from "../../utils/spinner";

describe('Feature: Order Details Component', () => {

    beforeAll(() => {
        delete window.location;
        window.location = new URL('https://www.waters.com/my-account.html#orderdetails?id=15740002');
        window.scrollTo = jest.fn();

        jest.mock('react', () => ({
          ...jest.requireActual('react'),
          useEffect: (f) => f(),
        }));

    });

    afterAll(() => {
        jest.mockRestoreAll();
    });

    describe('Scenario: Rendering', () => {
        const wrapper = shallow(<OrderDetails {...props} />);

        describe("When component is mounted", () => {

            it("It should get order id from url", () => {
                expect(window.location.hash).toEqual("#orderdetails?id=15740002");
            });
        })

        describe("When no order is found", () => {
            window.fetch = jest.fn(() => {
                return {
                    status: 704,
                    json: async () => {}
                }
            });

            it("Then it should match snapshot", () => {
                const json = renderer.create(<OrderDetails {...props} />);
                expect(json).toMatchSnapshot();
            });
        })
    })
})