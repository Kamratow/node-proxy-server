require("dotenv").config();

console.log("Hello world");

const NASA_API_KEY = process.env.NASA_API_KEY;

function formatDateToYearMonthDay(dateToFormat) {
  return dateToFormat.toISOString().slice(0, 10);
}

function getAsteroidDates() {
  const currentDate = new Date();
  const fiveDaysAgo = new Date();

  // set past date to be 5 days before current date
  fiveDaysAgo.setDate(currentDate.getDate() - 5);

  return {
    currentDate: formatDateToYearMonthDay(currentDate),
    fiveDaysAgo: formatDateToYearMonthDay(fiveDaysAgo),
  };
}

async function getAsteroidsData(startDate, endDate) {
  const NEO_FEED_API_URL = process.env.NEO_FEED_API_URL;

  try {
    const response = await fetch(
      `${NEO_FEED_API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`
    );
    const parsedResponse = await response.json();

    console.log(parsedResponse.near_earth_objects);
  } catch (error) {
    console.error("Error fetching asteroids:", error);
  }
}

const { currentDate, fiveDaysAgo } = getAsteroidDates();

getAsteroidsData(currentDate, fiveDaysAgo);
