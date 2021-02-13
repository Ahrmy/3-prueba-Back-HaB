function jsonError(err, res) {
  console.log(err);
  if (err.name === 'ValidationError') {
    err.status = 400;
  }

  res.status(err.status || 500);
  console.log('err.message', err.message);
  res.send({ error: err.message });
}

module.exports = jsonError;
