const config = require("./config/config");
const express = require("express");
const errorHandler = require("./utils/errorHandler");
const Exception = require("./utils/exception");
const meteorRoutes = require("./routes/meteorRoutes");

const PORT = config.port;

const app = express();

app.get("/", (_req, res) => {
  res.send("Welcome to meteors API!");
});

app.use("/api", meteorRoutes);

// handle 404 not found error
app.use((_req, res, next) => {
  const error = new Exception("Resource not found", 404);
  next(error);
});

// handle 500 internal server error
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
