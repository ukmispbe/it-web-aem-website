import ServletService from '../servletService';

describe('Feature: ServletService', () => {
    describe('Scenario: Fetching System Wide Notification', () => {
        describe('When the backend fails', () => {
            it('Then the notification is considered disabled with error message in the title', async () => {
                const errorMessage = 'The backend failed';
                ServletService.fetchSystemWideNotification = jest.fn(async () => {
                    throw Error(errorMessage);
                });

                const response = await ServletService.getSystemWideNotification();

                expect(response.enabled).toEqual(false);
                expect(response.title).toEqual(errorMessage);
            });
        });

        describe('When the backend returns an empty message', () => {
            it('Then the notification is considered disabled', async () => {
                ServletService.fetchSystemWideNotification = jest.fn(async () => {
                    return {
                        message: ''
                    }
                });

                const response = await ServletService.getSystemWideNotification();

                expect(response.enabled).toEqual(false);
            });
        });

        describe('When the backend returns a message', () => {
            it('Then the notification is considered enabled', async () => {
                ServletService.fetchSystemWideNotification = jest.fn(async () => {
                    return {
                        message: 'Hello World'
                    }
                });

                const response = await ServletService.getSystemWideNotification();

                expect(response.enabled).toEqual(true);
            });
        });
    });
});