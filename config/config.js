require("dotenv").config();

const config = {
  nasaApiKey: process.env.NASA_API_KEY,
  neoFeedApiUrl: process.env.NEO_FEED_API_URL,
  port: process.env.PORT || 4000,
};

module.exports = config;
