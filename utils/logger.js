const winston = require("winston");
logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "./log/error.log",
      level: "error"
    }),
    new winston.transports.File({ filename: "./log/combined.log" })
  ]
});

if (process.env.NODE_ENV != "development") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = logger;