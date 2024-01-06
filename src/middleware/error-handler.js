// middleware error handler

async function errorHandler(err, req, res, next) {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({ message });
}

module.exports = { errorHandler };
