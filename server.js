const { Requester } = require("@chainlink/external-adapter");
const express = require("express");
const bodyParser = require("body-parser");
const createRequest = require("./src/adapter").createRequest;
const { isValidEndpoint } = require("./src/utils");
const routes = require("./src/routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  const endpoint = req.body.data.endpoint;
  if (isValidEndpoint(endpoint)) {
    req.url = `/${endpoint}`;
    next();
  } else {
    res.status(500).json({ error: "Invalid endpoint" });
  }
});

app.use("/", routes);

// app.post("/", (req, res) => {
//   const endpoint = req.body.data.endpoint;
//   if (isValidEndpoint(endpoint)) {
//     createRequest;
//   }
// });

app.listen(port, () => console.log(`Listening on port ${port}!`));
