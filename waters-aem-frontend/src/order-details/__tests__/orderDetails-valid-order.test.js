import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { act } from "react-dom/test-utils";

import { OrderDetails } from '../index';
import ErrorBoundary from '../../search';
import * as getOrderDetails from '../orderDetails.services';
import props from '../__mocks__/en_US/index';
import { orderDetailsJSON } from '../__mocks__/en_US/services-json.test';
import Spinner from "../../utils/spinner";

describe('Feature: Order Details Component', () => {

    let wrapper;

    beforeAll(async () => {
        delete window.location;
        window.location = new URL('https://www.waters.com/nextgen/us/en/account/my-account.html#orderdetails?id=15740002');
        window.scrollTo = jest.fn();
        global.fetch = jest.fn();
    });

    beforeEach(() => {
        const setErrorBoundaryToTrue = jest.fn();
        const resetErrorBoundaryToFalse = jest.fn();
        const removeNotifications = jest.fn();
        wrapper = shallow(<OrderDetails {...props} setErrorBoundaryToTrue={setErrorBoundaryToTrue} resetErrorBoundaryToFalse={resetErrorBoundaryToFalse} removeNotifications={removeNotifications} />, { disableLifecycleMethods: true });
    });

    afterEach(() => {
        //wrapper.unmount();
        jest.clearAllMocks();
    });

    describe('Scenario: Rendering', () => {

        describe("When component is mounted", () => {

            it("It should get order id from url", async () => {
//                await act(async () => {
//                    wrapper = shallow(<OrderDetails {...props} />);
//                })
//                wrapper.update();
                expect(window.location.hash).toEqual("#orderdetails?id=15740002");
//                expect(wrapper.state('orderId')).to.equal(15740002);
            });

            it('should fetch data from server when server returns a successful response', done => { // 1

//                const mockSuccessResponse = {
//                    status: 200,
//                    json: async () => orderDetailsJSON
//                };
//                const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
//                const mockFetchPromise = Promise.resolve({ // 3
//                  json: () => orderDetailsJSON,
//                });
//
//                jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4

//                expect(global.fetch).toHaveBeenCalledTimes(1);
                //expect(global.fetch).toHaveBeenCalledWith(props.config.fetchDetailsEndPoint);
                const spyDidMount = jest.spyOn(OrderDetails.prototype,"componentDidMount");
                const spyGetOrderDetails = jest.spyOn(getOrderDetails, 'getOrderDetails').mockImplementation(() => {
                   return Promise.resolve({
                     status: 200,
                     json: () => {
                     return Promise.resolve({...orderDetailsJSON});
                    }
                  });
                });
                const didMount = wrapper.instance().componentDidMount();
                // expecting componentDidMount have been called
                expect(spyDidMount).toHaveBeenCalled();
                didMount.then(() => {
                   // updating the wrapper
                   wrapper.update();
                   expect(spyGetOrderDetails).toHaveBeenCalled();
                   expect(wrapper.state('orderId')).toBe('15740002');
                   console.log(wrapper.instance());

//                   expect(wrapper.find("p.user").text()).toContain("manas");
//                   expect(wrapper.find("spans.loading").length).toBe(0);
                   spyDidMount.mockRestore();
                   fetch.mockClear();
                   done();
                });
            });

            it('Then the snapshot should match', async () => {
                let json;
                await renderer.act(async () => {
                    json = renderer.create(<OrderDetails {...props} />);
                });
                expect(json).toMatchSnapshot();
            });

        })

    })
})