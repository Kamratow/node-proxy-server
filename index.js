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

function parseAsteroidsResponse(responseToParse) {
  const newNearEarthObjects = {};

  for (const [key, value] of Object.entries(
    responseToParse["near_earth_objects"]
  )) {
    const newObjectsList = value.map((singleObject) => {
      const diameterAverage =
        (singleObject.estimated_diameter.meters.estimated_diameter_max +
          singleObject.estimated_diameter.meters.estimated_diameter_min) /
        2;

      return {
        id: singleObject.id,
        name: singleObject.name,
        diameter_meters: diameterAverage,
        is_potentially_hazardous_asteroid:
          singleObject.is_potentially_hazardous_asteroid,
        close_approach_date_full:
          singleObject.close_approach_data[0].close_approach_date_full,
        relative_velocity_kps:
          singleObject.close_approach_data[0].relative_velocity
            .kilometers_per_second,
      };
    });

    newNearEarthObjects[key] = newObjectsList;
  }

  const parsedResponse = {
    ...responseToParse,
    near_earth_objects: newNearEarthObjects,
  };

  return parsedResponse;
}

app.get("/", (_req, res) => {
  res.send("Welcome to meteors API!");
});

app.get("/meteors", async (_req, res) => {
  const { currentDate, fiveDaysAgo } = getAsteroidDates();

  const response = await getAsteroidsData(currentDate, fiveDaysAgo);

  const parsedResponse = parseAsteroidsResponse(response);

  res.json({ data: parsedResponse });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
