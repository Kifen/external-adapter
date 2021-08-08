const { Requester, Validator } = require("@chainlink/external-adapter");
const { sumOfBalances, highestBalance, lowestBalance } = require("./utils");

const customError = (data) => {
  if (data.Response === "Error") return true;
  return false;
};

const customParams = {
  base: ["base"],
  endpoint: false,
};

const createRequest = (action, callback, input = {}) => {
  let validator;
  if (action === "sum") {
    validator = new Validator();
  } else {
    validator = new Validator(input, customParams);
  }

  const jobRunID = validator.validated.id;
  const url =
    "https://gist.githubusercontent.com/thodges-gh/3bd03660676504478de60c3a17800556/raw/0013f560b97eb1b2481fd4d57f02507c96f0d88f/balances.json";
  const config = { url };

  let result;
  Requester.request(config, customError)
    .then((response) => {
      const data = response.data;
      switch (action) {
        case "sum":
          const balances = data.filter((account) => account.balance);
          result = sumOfBalances(data);
          console.log("RR: ", result);
          break;
        case "highest_balance":
          result = highestBalance(data);
          break;
        case "lowest_balance":
          result = lowestBalance(data);
          break;
      }

      callback(response.status, {
        id: jobRunID,
        data: { answer: result },
      });
    })
    .catch((error) => {
      console.log("FAILED...");
      callback(500, Requester.errored(jobRunID, error));
    });
};

module.exports.createRequest = createRequest;
