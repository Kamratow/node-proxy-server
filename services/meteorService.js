const config = require("../config/config");

const parseMeteorResponse = (responseToParse) => {
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
};

const getMeteorData = async (startDate, endDate) => {
  const NASA_API_KEY = config.nasaApiKey;
  const NEO_FEED_API_URL = config.neoFeedApiUrl;

  try {
    const response = await fetch(
      `${NEO_FEED_API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`
    );
    const unpackedResponse = await response.json();

    return parseMeteorResponse(unpackedResponse);
  } catch (error) {
    console.error("Error fetching asteroids:", error);
  }
};

module.exports = { getMeteorData };
