import ServletService from '../services/servletService';
import SystemWideNotification from '../systemWideNotification';

describe('Feature: SystemWideNotification', () => {
    beforeAll(() => {
        window.digitalData = {};
    });

    describe('Scenario: Component Visibility', () => {
        describe('When there is no message', () => {
            it('Then it should not be visible', async () => {
                ServletService.getSystemWideNotification = jest.fn(async () => {
                    return {
                        enabled: false
                    };
                });

                const notification = new SystemWideNotification(ServletService);
                const result = await notification.create(Date.now);
                
                expect(result.visible).toEqual(false);
            });
        });

        describe('When there is a message but the date is out of range', () => {
            it('Then it should not be visible', async () => {
                ServletService.getSystemWideNotification = jest.fn(async () => {
                    return {
                        enabled: true,
                        dateRange: {
                            isValid: jest.fn(() => false)
                        }
                    };
                });

                const notification = new SystemWideNotification(ServletService);
                const time = (new Date(2019, 1, 4)).getTime();
                const result = await notification.create(time);

                expect(result.visible).toEqual(false);
            });
        });

        describe('When there is a message and the date is in range', () => {
            it('Then it should be visible', async () => {
                ServletService.getSystemWideNotification = jest.fn(async () => {
                    return {
                        enabled: true,
                        dateRange: {
                            isValid: jest.fn(() => true)
                        }
                    };
                });

                const notification = new SystemWideNotification(ServletService);
                const time = (new Date(2019, 1, 4)).getTime();
                const result = await notification.create(time);

                expect(result.visible).toEqual(true);
            });
        });
    });
});