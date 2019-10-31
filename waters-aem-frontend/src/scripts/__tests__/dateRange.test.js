import DateRange from '../dateRange';

console.warn = jest.fn();

// 2019-11-21T10:31:00-06:00
const onTime = 1574353860000;

// 2019-11-23T10:31:00-06:00
const offTime = 1574526660000;

const getPastDate = (now = new Date()) => new Date(now.getFullYear() - 1, 1, 1);
const getFutureDate = (now = new Date()) => new Date(now.getFullYear() + 1, 1, 1);
const getBetweenDate = (now = new Date(), offSetDays = 1) => new Date(now.getFullYear(), now.getMonth(), now.getDate() + offSetDays, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

describe('Feature: DateRange Module', () => {
    describe('Scenario: Instantiation', () => {
        describe('When start and end dates are not provided', () => {
            it('Then no errors should be thrown', () => {
                expect(() => new DateRange()).not.toThrow(TypeError);
            });
        });
        describe('When start date is invalid', () => {
            it('Then type error should be thrown', () => {
                expect(() => new DateRange('a')).toThrow(TypeError);
            });
        });
        describe('When end date is invalid', () => {
            it('Then type error should be thrown', () => {
                expect(() => new DateRange(onTime, 'a')).toThrow(TypeError);
            });
        });
        describe('When start date is after the end date', () => {
            it('Then type error should be thrown', () => {
                expect(() => new DateRange(offTime, onTime)).toThrow(RangeError);
            });
        });
    });

    describe('Scenario: Range Validation', () => {
        let dateRange;

        describe('When there is no range', () => {
            beforeAll(() => dateRange = new DateRange());

            it('Then past date is valid', () => {
                const date = getPastDate();
                const actual = dateRange.isValid(date.getTime());
                expect(actual).toEqual(true);
            });
            it('And present date is valid', () => {
                const actual = dateRange.isValid(Date.now());
                expect(actual).toEqual(true);
            });
            it('Then future date is valid', () => {
                const date = getFutureDate();
                const actual = dateRange.isValid(date.getTime());
                expect(actual).toEqual(true);
            });
        });

        describe('When there is a start date and no end date', () => {
            beforeAll(() => dateRange = new DateRange(onTime));

            it('Then any previous date is invalid', () => {
                const date = getPastDate();
                const actual = dateRange.isValid(date.getTime());
                expect(actual).toEqual(false);
            });
            it('And any subsequent date is valid', () => {
                const date = getFutureDate();
                const actual = dateRange.isValid(date.getTime());
                expect(actual).toEqual(true);
            });
        });

        describe('When there is an end date and no start date', () => {
            beforeAll(() => dateRange = new DateRange(null, offTime));

            it('Then any previous data is valid', () => {
                const date = getPastDate();
                const actual = dateRange.isValid(date.getTime());
                expect(actual).toEqual(true);
            });
            it('And any subsequent date is invalid', () => {
                const date = getFutureDate();
                const actual = dateRange.isValid(date.getTime());
                expect(actual).toEqual(false);
            });
        });

        describe('When there is both a start and end date', () => {
            beforeAll(() => dateRange = new DateRange(onTime, offTime));

            it('Then any date before the start is invalid', () => {
                const date = getPastDate(new Date(onTime));
                const actual = dateRange.isValid(date.getTime());
                expect(actual).toEqual(false);
            });
            it('And any date after the end is invalid', () => {
                const date = getFutureDate(new Date(offTime));
                const actual = dateRange.isValid(date.getTime());
                expect(actual).toEqual(false);
            });
            it('And any date between the range is valid', () => {
                const date = getBetweenDate(new Date(offTime), -1);
                const actual = dateRange.isValid(date.getTime());
                expect(actual).toEqual(true);
            });
        });
    });
});