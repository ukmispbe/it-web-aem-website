const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  export const renderDateToday = () => {
      const dateToday = new Date();
      return  `${months[dateToday.getMonth()]} ${dateToday.getDate()}, ${dateToday.getFullYear()}`;
  }