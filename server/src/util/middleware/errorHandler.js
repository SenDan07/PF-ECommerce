const errorHandler = (err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).send(message);
  next();
}

module.exports = errorHandler