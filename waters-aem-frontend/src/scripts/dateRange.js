const invalidDateValue = 'Invalid Date';

const DateRange = function(startValue, endValue) {
  const startDate = startValue ? new Date(startValue) : null;
  const endDate = endValue ? new Date(endValue) : null;

  validateParameters(startDate, endDate);

  this.isValid = date => {
    const comparisonDate = date ? date : Date.now();

    if (
      (!startValue && !endValue)
      ||
      (startValue && !endValue && comparisonDate >= startValue)
      ||
      (!startValue && endValue && comparisonDate <= endValue)
      ||
      (startValue && endValue && comparisonDate >= startValue && comparisonDate <= endValue)) {
      return true;
    }

    return false;
  }

  function validateParameters(startUtc, endUtc) {
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
};

export default DateRange;