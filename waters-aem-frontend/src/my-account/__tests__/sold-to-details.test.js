jest.mock('../../stores/sessionStore');

import SoldToDetails, { replaceParameter, sortPriority } from '../services/SoldToDetails';
import SessionStore, { keys as StoreKeys }from '../../stores/sessionStore';
import { userTokenStr, soldToDetailsJSON, soldToDetailsURL, soldToDetailsSortedJSON, userTokenStrInvalidSoldTo, soldToDetailsInvalidSoldToJSON } from '../__mocks__/en_US/mock-services-json';

const test = (value, regex) => regex.test(value);
const emailValidationRegEx = /(\?email=)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

describe('Feature: Sold To Details Service Call', () => {
        const mockResponse = (url, statusText, responseOptions) => {
            let status;
            let response;

            if (test(url, emailValidationRegEx)) {
                [status, response] = responseOptions.pass
            } else { 
                [status, response] = responseOptions.fail
            }

            return new window.Response(response, {
              status: status,
              statusText: statusText,
              headers: {
                'Content-type': 'application/json'
              },
              json: jest.fn()
            });
        };

        describe(`When "${StoreKeys.soldToDetails}" session storage contains data`, () => {
            it(`Then "SoldToDetails()" should return the Sold To array from session storage`, async () => { 
                const sessionStore = new SessionStore();

                sessionStore.getSoldToDetails = jest.fn(() => {
                    return soldToDetailsSortedJSON;
                });

                const response = await SoldToDetails('', sessionStore);
                expect(JSON.stringify(response)).toEqual(JSON.stringify(soldToDetailsSortedJSON));
            });
        });

        describe(`Given "${StoreKeys.soldToDetails}" session storage is empty`, () => {

            describe(`When "${StoreKeys.userToken}" contains a valid email with an associated SoldTo/SAP Account(s) (ie "${userTokenStr}")`, () => {

                let requestUrl;
                let sessionStore;

                beforeAll(() => {
                    window.fetch = jest.fn().mockImplementation((url) =>
                        Promise.resolve(
                            mockResponse(
                                url,
                                null,
                                {
                                    pass: [200, JSON.stringify(soldToDetailsJSON)],
                                    fail: [500, JSON.stringify({})]
                                }
                            )
                        )
                    );
                    requestUrl = replaceParameter(soldToDetailsURL, userTokenStr)
                    sessionStore = new SessionStore();

                    let currentUserToken = userTokenStr;
                    let currentSoldToDetails = JSON.stringify({});

                    sessionStore.setSoldToDetails = jest.fn((value) => {
                        currentSoldToDetails = JSON.stringify(value);
                    });

                    sessionStore.getSoldToDetails = jest.fn(() => {
                        return currentSoldToDetails ? JSON.parse(currentSoldToDetails) : null;
                    });

                    sessionStore.getUserToken = jest.fn(() => {
                        return currentUserToken;
                    });
                });

                it(`Then "SoldToDetails()" should return an array with sold to details`, async () => { 
                    const response = await SoldToDetails(requestUrl, sessionStore);
                    expect(response).toEqual(soldToDetailsSortedJSON);
                });

                it(`Then "SoldToDetails()" should assign the returned user details to "${StoreKeys.soldToDetails}" in session storage`, async () => { 
                    const response = await SoldToDetails(requestUrl, sessionStore);
                    expect(sessionStore.getSoldToDetails()).toEqual(soldToDetailsSortedJSON);
                });

                it(`Then "SoldToDetails()" should return a sorted response array by priority`, async () => { 
                    const response = await SoldToDetails(requestUrl, sessionStore);
                    expect(response).toEqual(soldToDetailsSortedJSON);
                    expect(sortPriority(soldToDetailsJSON)).toEqual(soldToDetailsSortedJSON);
                });
            });

            describe(`When "${StoreKeys.userToken}" contains a valid account email but not a valid associated SoldTo/SAP Account (ie "${userTokenStr}")`, () => {

                let requestUrl;
                let sessionStore;

                beforeAll(() => {
                    window.fetch = jest.fn().mockImplementation((url) =>
                        Promise.resolve(
                            mockResponse(
                                url,
                                null,
                                {
                                    pass: [200, JSON.stringify(soldToDetailsInvalidSoldToJSON)],
                                    fail: [500, JSON.stringify({})]
                                }
                            )
                        )
                    );
                    requestUrl = replaceParameter(soldToDetailsURL, userTokenStrInvalidSoldTo)
                    console.log(requestUrl)
                    sessionStore = new SessionStore();

                    let currentUserToken = userTokenStrInvalidSoldTo;
                    let currentSoldToDetails = JSON.stringify({});

                    sessionStore.setSoldToDetails = jest.fn((value) => {
                        currentSoldToDetails = JSON.stringify(value);
                    });

                    sessionStore.getSoldToDetails = jest.fn(() => {
                        return  currentSoldToDetails ? JSON.parse(currentSoldToDetails) : null;
                    });

                    sessionStore.getUserToken = jest.fn(() => {
                        return currentUserToken;
                    });
                });

                it(`Then "SoldToDetails()" should return an empty array`, async () => { 
                    const response = await SoldToDetails(requestUrl, sessionStore);
                    expect(response).toEqual(soldToDetailsInvalidSoldToJSON);
                });
            });

            describe(`When "${StoreKeys.userToken}" contains an invalid email`, () => {

                let requestUrl;
                let sessionStore;
                let badEmail = 'test.com'

                beforeAll(() => {
                    window.fetch = jest.fn().mockImplementation((url) =>
                        Promise.resolve(
                            mockResponse(
                                url,
                                null,
                                {
                                    pass: [200, JSON.stringify(soldToDetailsJSON)],
                                    fail: [500, JSON.stringify({})]
                                }
                            )
                        )
                    );
                    
                    requestUrl = replaceParameter(soldToDetailsURL, badEmail)
                    sessionStore = new SessionStore();

                    let currentUserToken = userTokenStr;
                    let currentSoldToDetails = JSON.stringify({});

                    sessionStore.setSoldToDetails = jest.fn((value) => {
                        currentSoldToDetails = JSON.stringify(value);
                    });

                    sessionStore.getSoldToDetails = jest.fn(() => {
                        return currentSoldToDetails ? JSON.parse(currentSoldToDetails) : null;
                    });

                    sessionStore.getUserToken = jest.fn(() => {
                        return currentUserToken;
                    });
                    
                });

                it(`Then "SoldToDetails()" should throw an error with the response status`, async () => { 
                    const response = new SoldToDetails(requestUrl, sessionStore)
                    response.catch(err => {
                        expect(err.message).toEqual("500")
                    });
                });

            });

            describe(`When "${StoreKeys.userToken}" is empty or not available`, () => {

                let requestUrl;
                let sessionStore;

                beforeAll(() => {
                    window.fetch = jest.fn().mockImplementation((url) =>
                        Promise.resolve(
                            mockResponse(
                                url,
                                null,
                                {
                                    pass: [200, JSON.stringify(soldToDetailsJSON)],
                                    fail: [500, JSON.stringify({})]
                                }
                            )
                        )
                    );
                    
                    requestUrl = replaceParameter(soldToDetailsURL, userTokenStr)
                    sessionStore = new SessionStore();

                    let currentUserToken = '';
                    let currentSoldToDetails = JSON.stringify({});

                    sessionStore.setSoldToDetails = jest.fn((value) => {
                        currentSoldToDetails = JSON.stringify(value);
                    });

                    sessionStore.getSoldToDetails = jest.fn(() => {
                        return currentSoldToDetails ? JSON.parse(currentSoldToDetails) : null;
                    });

                    sessionStore.getUserToken = jest.fn(() => {
                        return currentUserToken;
                    });
                    
                });

                it(`Then "SoldToDetails()" should throw an error "No User Token"`, async () => { 
                    const response = new SoldToDetails(requestUrl, sessionStore)
                    response.catch(err => {
                        expect(err.message).toEqual('No User Token')
                    });
                    
                });

            });


            describe(`When the SoldTo Endpoint doesn't return an array`, () => {

                let requestUrl;
                let sessionStore;

                beforeAll(() => {
                    window.fetch = jest.fn().mockImplementation((url) =>
                        Promise.resolve(
                            mockResponse(
                                url,
                                null,
                                {
                                    pass: [200, JSON.stringify({})],
                                    fail: [500, JSON.stringify({})]
                                }
                            )
                        )
                    );
                    requestUrl = replaceParameter(soldToDetailsURL, userTokenStrInvalidSoldTo)
                    sessionStore = new SessionStore();

                    let currentUserToken = userTokenStrInvalidSoldTo;
                    let currentSoldToDetails = JSON.stringify({});

                    sessionStore.setSoldToDetails = jest.fn((value) => {
                        currentSoldToDetails = JSON.stringify(value);
                    });

                    sessionStore.getSoldToDetails = jest.fn(() => {
                        return  currentSoldToDetails ? JSON.parse(currentSoldToDetails) : null;
                    });

                    sessionStore.getUserToken = jest.fn(() => {
                        return currentUserToken;
                    });
                });

                it(`Then "SoldToDetails()" should throw an error`, async () => { 
                    const response = new SoldToDetails(requestUrl, sessionStore);
                    response.catch(err => {
                        expect(err.message).toEqual('Response was not an array')
                    });
                });
            });

        });

});