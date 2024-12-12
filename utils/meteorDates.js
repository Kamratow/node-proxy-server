function formatDateToYearMonthDay(dateToFormat) {
  return dateToFormat.toISOString().slice(0, 10);
}

function getMeteorDates() {
  const currentDate = new Date();
  const fiveDaysAgo = new Date();

  // set past date to be 5 days before current date
  fiveDaysAgo.setDate(currentDate.getDate() - 5);

  return {
    currentDate: formatDateToYearMonthDay(currentDate),
    fiveDaysAgo: formatDateToYearMonthDay(fiveDaysAgo),
  };
}

module.exports = getMeteorDates;
