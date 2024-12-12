const meteorService = require("../services/meteorService");
const getMeteorDates = require("../utils/meteorDates");
const { parseBoolean } = require("../utils/parseBoolean");

exports.getMeteors = async (req, res) => {
  const { startDate, endDate } = req.query;
  const count = parseBoolean(req.query.count);
  const wereDangerousMeteors = parseBoolean(
    req.query["were-dangerous-meteors"]
  );

  let startDateForMeteorData, endDateForMeteorData;

  if (startDate && endDate) {
    startDateForMeteorData = startDate;
    endDateForMeteorData = endDate;
  } else {
    const { currentDate, fiveDaysAgo } = getMeteorDates();

    startDateForMeteorData = currentDate;
    endDateForMeteorData = fiveDaysAgo;
  }

  const response = await meteorService.getMeteorData(
    startDateForMeteorData,
    endDateForMeteorData
  );

  const { element_count, were_dangerous_meteors } = response;

  if (count && !wereDangerousMeteors) {
    return res.json({ data: { element_count } });
  }

  if (!count && wereDangerousMeteors) {
    return res.json({ data: { were_dangerous_meteors } });
  }

  if (count && wereDangerousMeteors) {
    return res.json({ data: { element_count, were_dangerous_meteors } });
  }

  return res.json({ data: response });
};
