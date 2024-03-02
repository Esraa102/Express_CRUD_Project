const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const errorStatus = res.statusCode ? res.statusCode : 500;
  switch (errorStatus) {
    case constants.VALIDATION_FAILED:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unathorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.INTERNAL_SERVER_ERROR:
      res.json({
        title: "Internal Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
      console.log("No Errors, All Good!");
      break;
  }
};

module.exports = errorHandler;
