const meteorService = require("../services/meteorService");
const getMeteorDates = require("../utils/meteorDates");

exports.getMeteors = async (_req, res) => {
  const { currentDate, fiveDaysAgo } = getMeteorDates();

  const response = await meteorService.getMeteorData(currentDate, fiveDaysAgo);

  res.json({ data: response });
};
