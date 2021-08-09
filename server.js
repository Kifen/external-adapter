const { Requester } = require("@chainlink/external-adapter");
const express = require("express");
const bodyParser = require("body-parser");
const createRequest = require("./src/adapter").createRequest;
const { isValidEndpoint, parseUrl } = require("./src/utils");
const routes = require("./src/routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(parseUrl);

app.use("/", routes);

app.listen(port, () => console.log(`Listening on port ${port}!`));
