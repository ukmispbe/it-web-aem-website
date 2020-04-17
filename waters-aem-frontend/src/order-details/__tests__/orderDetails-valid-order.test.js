import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { act } from "react-dom/test-utils";

import OrderDetails from '../index';
import ErrorBoundary from '../../search';
import { getOrderDetails } from '../orderDetails.services';
import props from '../__mocks__/en_US/index';
import { orderDetailsJSON } from '../__mocks__/en_US/services-json.test';
import Spinner from "../../utils/spinner";

describe('Feature: Order Details Component', () => {

    let wrapper, getFetchSpy, mockJSONPromise;

    beforeEach(async () => {
        delete window.location;
        window.location = new URL('https://www.waters.com/nextgen/us/en/account/my-account.html#orderdetails?id=15740002');
        window.scrollTo = jest.fn();

        const mockSuccessResponse = {
            status: 200,
            json: async () => orderDetailsJSON
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => orderDetailsJSON,
        });

        //jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4
    });

    
    beforeAll(() => {
        mockJSONPromise = Promise.resolve({ // 5
            json: () => orderDetailsJSON,
        });
        getFetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockJSONPromise); // 6
        
        //getOrderDetails.mockImplementation(() => ({ maps: "test" }));
    });

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

//        global.fetch = jest.fn(() => {
//            return {
//                status: 200,
//                json: async () => orderDetailsJSON
//            }
//        });

    describe('Scenario: Rendering', () => {

        describe("When component is mounted", () => {

            it("It should get order id from url", async () => {
                await act(async () => {
                    wrapper = shallow(<OrderDetails {...props} />);
                })
                wrapper.update();
                expect(window.location.hash).toEqual("#orderdetails?id=15740002");
                expect(wrapper.state('orderId')).to.equal(15740002);
            });

            describe("When status is 200", () => {
                it("Then it should return user details", async () => {
                    window.fetch = jest.fn(() => {
                        return {
                            status: 200,
                            json: async () => orderDetailsJSON
                        }
                    });
        
                    const result = await getOrderDetails;
                    console.log("result", result);
                    console.log("orderDetailsJSON", orderDetailsJSON);
                    expect(result).toEqual(orderDetailsJSON);
                })
            });

            // it('should fetch data from server when server returns a successful response', () => { // 1

            //     expect(getFetchSpy).toHaveBeenCalledTimes(1);
            //     //expect(global.fetch).toHaveBeenCalledWith(props.config.fetchDetailsEndPoint);

            // });

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