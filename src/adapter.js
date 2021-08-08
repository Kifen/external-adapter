const { Requester, Validator } = require("@chainlink/external-adapter");
const { sumOfBalances, highestBalance } = require("./utils");

const customError = (data) => {
  if (data.Response === "Error") return true;
  return false;
};

const createRequest = (input, callback, action) => {
  const validator = new Validator(callback, input);
  const jobRunID = validator.validated.id;
  const url =
    "https://gist.githubusercontent.com/thodges-gh/3bd03660676504478de60c3a17800556/raw/0013f560b97eb1b2481fd4d57f02507c96f0d88f/balances.json";
  const config = { url };

  let result;
  Requester.request(config, customError).then((response) => {
    const data = response.data;
    switch (action) {
      case "total_balances":
        const balances = data.filter((account) => account.balance);
        result = sumOfBalances(balances);
        break;
      case "highest_balance":
        result = highestBalance(data);
    }
  });
};
