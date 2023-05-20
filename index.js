const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const app = express();
require("./db");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use("/v1", require("./route"));

app.listen(PORT, () => {
  console.log("Running server on PORT ", PORT);
});
