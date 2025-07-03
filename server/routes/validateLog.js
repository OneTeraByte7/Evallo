module.exports = function validateLog(log) {
  const requiredFields = [
    "level",
    "message",
    "resourceId",
    "timestamp",
    "traceId",
    "spanId",
    "commit",
    "metadata",
  ];

  const validLevels = ["error", "warn", "info", "debug"];

  for (let field of requiredFields) {
    if (!log.hasOwnProperty(field)) return false;
  }

  if (!validLevels.includes(log.level)) return false;
  if (typeof log.message !== "string") return false;
  if (!Date.parse(log.timestamp)) return false;
  if (typeof log.metadata !== "object") return false;

  return true;
};
