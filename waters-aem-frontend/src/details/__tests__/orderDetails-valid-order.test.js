import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { OrderDetails } from '../order-details/index';
import * as getOrderDetails from '../details.services';
import props from '../__mocks__/en_US/index';
import { orderDetailsJSON } from '../__mocks__/en_US/services-json.test';
import mockBodyHTML from '../../__mocks__/en_US/html/mock-body-html'

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
        wrapper.unmount();
        jest.clearAllMocks();
    });

    describe('Scenario: Rendering', () => {
        document.body.innerHTML = mockBodyHTML;

        describe("When component is mounted", () => {
            it("It should get order id from url", async () => {
                expect(window.location.hash).toEqual("#orderdetails?id=15740002");
            });

            it('should fetch data from server and set orderDetails state', done => { // 1

                const spyDidMount = jest.spyOn(OrderDetails.prototype,"componentDidMount");
                const spyGetOrderDetails = jest.spyOn(getOrderDetails, 'getOrderDetails').mockImplementation(() => {
                    return Promise.resolve(orderDetailsJSON);
                });
                const didMount = wrapper.instance().componentDidMount();
                expect(spyDidMount).toHaveBeenCalled();

                didMount.then(() => {
                    wrapper.update();
                    expect(spyGetOrderDetails).toHaveBeenCalled();
                    expect(wrapper.state('orderId')).toBe('15740002');
                    expect(wrapper.state('orderDetails')).toBe(orderDetailsJSON);

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