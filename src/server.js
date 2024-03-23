const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ApiRouter = require("./routes");
const { connect } = require("mongoose");
const { login, register, protect } = require("./utils/auth");

connect("mongodb://localhost:27017/fb-group-api-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", protect, ApiRouter);
app.post("/register", register);
app.post("/login", login);
app.post("/verify", protect);

const start = () => {
  app.listen(3007, () => {
    console.log("running on http://localhost:3007");
  });
};

module.exports = { app, start };
