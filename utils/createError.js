module.exports = (message, statusCode, status) => {
  const e = new Error(message);
  e.statusCode = statusCode;
  e.status = status;
  throw e;
};
