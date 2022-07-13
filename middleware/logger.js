const moments = require("moment");
const logger = (req, res, next) => {
  // we use next to move to the next middleware in the stack
  console.log("Hello from the middleware"); // everytime we request, this middleware will be executed , we can execute any code we want here
  //   we have access to req and res
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    } : ${moments().format()}`
  );
  next();
};

module.exports = logger;