const config = require("./config/config");
const express = require("express");

const app = express();

const PORT = config.port;

const NASA_API_KEY = config.nasaApiKey;

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
  const NEO_FEED_API_URL = config.neoFeedApiUrl;

  try {
    const response = await fetch(
      `${NEO_FEED_API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`
    );
    const unpackedResponse = await response.json();

    return unpackedResponse;
  } catch (error) {
    console.error("Error fetching asteroids:", error);
  }
}

app.get("/", (_req, res) => {
  res.send("Welcome to meteors API!");
});

app.get("/meteors", async (_req, res) => {
  const { currentDate, fiveDaysAgo } = getAsteroidDates();

  const response = await getAsteroidsData(currentDate, fiveDaysAgo);

  res.json({ data: response });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
