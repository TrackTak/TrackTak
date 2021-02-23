/* eslint-disable node/no-unpublished-require */
const axios = require("axios");
const fs = require("fs");

const apiToken = "";

const writeBulkEODDataToJSON = async () => {
  try {
    const { data } = await axios.get(
      `https://eodhistoricaldata.com/api/exchanges-list?api_token=${apiToken}&fmt=json`,
    );
    const jsons = fs.readdirSync("./data");
    const exchanges = data
      .map((x) => x.Code)
      .filter((x) => jsons.every((jsonName) => !jsonName.includes(x)));

    exchanges.forEach(async (exchange) => {
      const { data } = await axios.get(
        `https://eodhistoricaldata.com/api/eod-bulk-last-day/${exchange}?api_token=${apiToken}&fmt=json`,
      );

      fs.writeFileSync(`./data/${exchange}.json`, JSON.stringify(data));
    });
  } catch (error) {
    console.error(error);
  }
};

const writeBulkFundamentalsDataToJSON = async () => {
  try {
    const { data } = await axios.get(
      `https://eodhistoricaldata.com/api/exchanges-list?api_token=${apiToken}&fmt=json`,
    );

    const jsons = fs.readdirSync("./fundamentalsData");
    const exchanges = data
      .map((x) => x.Code)
      // US not supported
      .filter((x) => x !== "US")
      .concat(["NYSE", "NASDAQ", "BATS", "AMEX"])
      .filter((x) => jsons.every((jsonName) => !jsonName.includes(x)));

    exchanges.forEach(async (exchange) => {
      let i = 0;
      // API limits to 1000 requests each time
      const limit = 1000;
      let bulkData = [];
      let res;

      do {
        const offset = i * limit;

        res = await axios.get(
          `https://eodhistoricaldata.com/api/bulk-fundamentals/${exchange}?api_token=${apiToken}&fmt=json&offset=${offset}&limit=${limit}`,
        );
        i += 1;

        Object.values(res.data).forEach((datum) => {
          bulkData.push(datum);
        });
      } while (Object.keys(res.data).length);

      fs.writeFileSync(
        `./fundamentalsData/${exchange}.json`,
        JSON.stringify(bulkData),
      );
    });
  } catch (error) {
    console.error(error);
  }
};
