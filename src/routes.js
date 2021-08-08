const express = require("express");
const createRequest = require("./adapter").createRequest;
const { sumOfBalances, highestBalance, lowestBalance } = require("./utils");

const router = express.Router();

router.post("/sum", (req, res) => {
  createRequest(
    "sum",
    (status, result) => {
      console.log("Result: ", result);
      res.status(status).json(result);
    },
    req.body
  );
});

router.post("/query-balances", (req, res) => {
  createRequest(
    `${req.body.data.query}`,
    (status, result) => {
      res.status(status).json(result);
    },
    req.body
  );
});

module.exports = router;
