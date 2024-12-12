function errorHandler(err, _req, res, _next) {
  console.error(err.stack);
  res.status(err.statusCode).json({ error: "Internal Server Error" });
}

module.exports = errorHandler;
