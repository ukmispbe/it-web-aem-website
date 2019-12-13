jest.mock('../../stores/sessionStore');

import UserDetails, { replaceParameter } from '../services/UserDetails';
import SessionStore, { keys as StoreKeys }from '../../stores/sessionStore';
import { userTokenStr, userDetailsJSON, userDetailsURL } from '../__mocks__/en_US/user-details-json';

const test = (value, regex) => regex.test(value);
const emailValidationRegEx = /(\?email=)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

describe('Feature: User Details Service Call', () => {
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

        describe(`When "${StoreKeys.userDetails}" session storage contains data`, () => {
            it(`Then "UserDetails()" should return the user details object from session storage`, async () => { 
                const sessionStore = new SessionStore();

                sessionStore.getUserDetails = jest.fn(() => {
                    return userDetailsJSON;
                });

                const response = await UserDetails('', sessionStore);
                expect(JSON.stringify(response)).toEqual(JSON.stringify(userDetailsJSON));
            });
        });

        describe(`Given "${StoreKeys.userDetails}" session storage is empty`, () => {

            describe(`When "${StoreKeys.userToken}" contains a valid email (ie "${userTokenStr}")`, () => {

                let requestUrl;
                let sessionStore;

                beforeAll(() => {
                    window.fetch = jest.fn().mockImplementation((url) =>
                        Promise.resolve(
                            mockResponse(
                                url,
                                null,
                                {
                                    pass: [200, JSON.stringify(userDetailsJSON)],
                                    fail: [500, JSON.stringify({})]
                                }
                            )
                        )
                    );
                    requestUrl = replaceParameter(userDetailsURL, userTokenStr)
                    sessionStore = new SessionStore();

                    let currentUserToken = userTokenStr;
                    let currentUserDetails = JSON.stringify({});

                    sessionStore.setUserDetails = jest.fn((value) => {
                        currentUserDetails = JSON.stringify(value);
                    });

                    sessionStore.getUserDetails = jest.fn(() => {
                        return  currentUserDetails ? JSON.parse(currentUserDetails) : {}
                    });

                    sessionStore.getUserToken = jest.fn(() => {
                        return currentUserToken;
                    });
                });

                it(`Then "UserDetails()" should return an object with user details`, async () => { 
                    const response = await UserDetails(requestUrl, sessionStore);
                    expect(response).toEqual(userDetailsJSON);
                });

                it(`Then "UserDetails()" should assign the returned user details to "${StoreKeys.userDetails}" in session storage`, async () => { 
                    const response = await UserDetails(requestUrl, sessionStore);
                    expect(sessionStore.getUserDetails()).toEqual(userDetailsJSON);
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
                                    pass: [200, JSON.stringify(userDetailsJSON)],
                                    fail: [500, JSON.stringify({})]
                                }
                            )
                        )
                    );
                    
                    requestUrl = replaceParameter(userDetailsURL, badEmail)
                    sessionStore = new SessionStore();

                    let currentUserToken = userTokenStr;
                    let currentUserDetails = JSON.stringify({});

                    sessionStore.setUserDetails = jest.fn((value) => {
                        currentUserDetails = JSON.stringify(value);
                    });

                    sessionStore.getUserDetails = jest.fn(() => {
                        return  currentUserDetails ? JSON.parse(currentUserDetails) : {}
                    });

                    sessionStore.getUserToken = jest.fn(() => {
                        return currentUserToken;
                    });
                    
                });

                it(`Then "UserDetails()" should throw an error with the response status`, async () => { 
                    const response = new UserDetails(requestUrl, sessionStore)
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
                                    pass: [200, JSON.stringify(userDetailsJSON)],
                                    fail: [500, JSON.stringify({})]
                                }
                            )
                        )
                    );
                    
                    requestUrl = replaceParameter(userDetailsURL, userTokenStr)
                    sessionStore = new SessionStore();

                    let currentUserToken = '';
                    let currentUserDetails = JSON.stringify({});

                    sessionStore.setUserDetails = jest.fn((value) => {
                        currentUserDetails = JSON.stringify(value);
                    });

                    sessionStore.getUserDetails = jest.fn(() => {
                        return  currentUserDetails ? JSON.parse(currentUserDetails) : {}
                    });

                    sessionStore.getUserToken = jest.fn(() => {
                        return currentUserToken;
                    });
                    
                });

                it(`Then "UserDetails()" should throw an error "No User Token"`, async () => { 
                    const response = new UserDetails(requestUrl, sessionStore)
                    response.catch(err => {
                        expect(err.message).toEqual('No User Token')
                    });
                    
                });

            });



        });



   // });
});