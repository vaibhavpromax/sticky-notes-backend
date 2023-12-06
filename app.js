const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
const routes = require("./routes");
app.use("/sticky_notes", routes);

app.get("/", (_, res) => {
  res.status(200).send("Backend up and running");
});

module.exports = app;
