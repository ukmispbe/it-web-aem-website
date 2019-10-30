const invalidDateValue = 'Invalid Date';

const validateParameters = (startUtc, endUtc) => {
  if (startUtc && startUtc == invalidDateValue) {
    throw new TypeError("Start date/time is invalid");
  }

  if (endUtc && endUtc == invalidDateValue) {
    throw new TypeError("End date/time is invalid");
  }

  if (startUtc && endUtc && startUtc > endUtc) {
    throw new RangeError('Start date/time cannot come after the end date/time');
  }
}

const convertToUTC = value => {
  const date = new Date(value);
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
}

const DateRange = function(startValue, endValue) {
  const startUtc = startValue ? convertToUTC(startValue) : null;
  const endUtc = endValue ? convertToUTC(endValue) : null;

  validateParameters(startUtc, endUtc);

  this.isValid = date => {
    if (!startUtc && !endUtc) {
      return true;
    }

    const comparisonDate = date ? convertToUTC(date) : convertToUTC(new Date());

    if (
      (startUtc && !endUtc && comparisonDate >= startUtc)
      ||
      (!startUtc && endUtc && comparisonDate <= endUtc)
      ||
      (startUtc && endUtc && comparisonDate >= startUtc && comparisonDate <= endUtc)
    ) {
      return true;
    }

    return false;
  }
};

export default DateRange;