import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { QuoteDetails } from '../quote-details/index';
import * as getQuoteDetails from '../details.services';
import { myAccountJSON } from '../../__mocks__/en_US/html/mock-html-json';
import { quoteDetailsJSON } from '../__mocks__/en_US/services-json.test';
import mockBodyHTML from '../../__mocks__/en_US/html/mock-body-html';

describe('Feature: Quote Details Component', () => {
    let wrapper;
    let props = {config: myAccountJSON.html.quoteDetails};
    document.body.innerHTML = mockBodyHTML;

    beforeAll(async () => {
        delete window.location;
        window.location = new URL('https://www.waters.com/nextgen/us/en/account/my-account.html#quotedetails?id=15740002');
        window.scrollTo = jest.fn();
        global.fetch = jest.fn();
    });

    beforeEach(() => {
        const setErrorBoundaryToTrue = jest.fn();
        const resetErrorBoundaryToFalse = jest.fn();
        const removeNotifications = jest.fn();
        wrapper = shallow(<QuoteDetails {...props} setErrorBoundaryToTrue={setErrorBoundaryToTrue} resetErrorBoundaryToFalse={resetErrorBoundaryToFalse} removeNotifications={removeNotifications} />, { disableLifecycleMethods: true });
    });

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

    describe('Scenario: Rendering', () => {
        describe("When component is mounted", () => {
            it("It should get quote id from url", async () => {
                expect(window.location.hash).toEqual("#quotedetails?id=15740002");
            });

            it('should fetch data from server and set quoteDetails state', done => { // 1
                const spyDidMount = jest.spyOn(QuoteDetails.prototype,"componentDidMount");
                const spyGetQuoteDetails = jest.spyOn(getQuoteDetails, 'getQuoteDetails').mockImplementation(() => {
                    return Promise.resolve(quoteDetailsJSON);
                });
                const didMount = wrapper.instance().componentDidMount();
                expect(spyDidMount).toHaveBeenCalled();

                didMount.then(() => {
                    wrapper.update();
                    expect(spyGetQuoteDetails).toHaveBeenCalled();
                    expect(wrapper.state('quoteId')).toBe('15740002');
                    expect(wrapper.state('quoteDetails')).toBe(quoteDetailsJSON);

                    spyDidMount.mockRestore();
                    fetch.mockClear();
                    done();
                });
            });

            it('Then the snapshot should match', async () => {
                let json;
                await renderer.act(async () => {
                    json = renderer.create(<QuoteDetails {...props} />);
                });
                expect(json).toMatchSnapshot();
            });

        })
    })
})