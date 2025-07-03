const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs.json");

const readLogs = () => {
  const data = fs.readFileSync(logFilePath, "utf8");
  return JSON.parse(data);
};

const writeLogs = (logs) => {
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), "utf8");
};


router.post("/", (req, res) => {
  const log = req.body;

  const requiredFields = [
    "level", "message", "resourceId", "timestamp",
    "traceId", "spanId", "commit", "metadata"
  ];
  for (const field of requiredFields) {
    if (!log[field]) {
      return res.status(400).json({ error: `Missing field: ${field}` });
    }
  }

  try {
    const logs = readLogs();
    logs.push(log);
    writeLogs(logs);
    return res.status(201).json(log);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/", (req, res) => {
  try {
    const logs = readLogs();

    
    const {
      level,
      message,
      resourceId,
      timestamp_start,
      timestamp_end,
      traceId,
      spanId,
      commit,
    } = req.query;

   
    const passesFilters = (log) => {
      if (level && log.level !== level) return false;

      if (message && !log.message.toLowerCase().includes(message.toLowerCase()))
        return false;

      if (resourceId && log.resourceId !== resourceId) return false;

      // Timestamp range (inclusive)
      if (timestamp_start || timestamp_end) {
        const ts = new Date(log.timestamp).getTime();
        if (timestamp_start && ts < new Date(timestamp_start).getTime()) return false;
        if (timestamp_end && ts > new Date(timestamp_end).getTime()) return false;
      }

      if (traceId && log.traceId !== traceId) return false;
      if (spanId && log.spanId !== spanId) return false;
      if (commit && log.commit !== commit) return false;

      return true; 
    };

    
    const filtered = logs.filter(passesFilters).sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    return res.status(200).json(filtered);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
