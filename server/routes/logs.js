const express = require("express");
const router = express.Router();
const { readLogs, writeLogs } = require("../utils/db");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);

const logSchema = {
  type: "object",
  properties: {
    level: { type: "string", enum: ["error", "warn", "info", "debug"] },
    message: { type: "string" },
    resourceId: { type: "string" },
    timestamp: { type: "string", format: "date-time" },
    traceId: { type: "string" },
    spanId: { type: "string" },
    commit: { type: "string" },
    metadata: { type: "object" }
  },
  required: [
    "level",
    "message",
    "resourceId",
    "timestamp",
    "traceId",
    "spanId",
    "commit",
    "metadata"
  ],
  additionalProperties: false
};

const validateLog = ajv.compile(logSchema);

router.post("/", async (req, res) => {
  const log = req.body;
  if (!validateLog(log)) {
    return res.status(400).json({ error: "Invalid log format", details: validateLog.errors });
  }

  try {
    const logs = await readLogs();
    logs.push(log);
    
    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    await writeLogs(logs);
    res.status(201).json(log);
  } catch (err) {
    console.error("Error ingesting log:", err);
    res.status(500).json({ error: "Server error" });
  }
});

function filterLogs(logs, query) {
  return logs.filter((log) => {
  
    if (query.level && log.level !== query.level) return false;

    if (query.message && !log.message.toLowerCase().includes(query.message.toLowerCase())) return false;

    if (query.resourceId && !log.resourceId.toLowerCase().includes(query.resourceId.toLowerCase())) return false;

    if (query.traceId && log.traceId !== query.traceId) return false;

    if (query.spanId && log.spanId !== query.spanId) return false;

    if (query.commit && log.commit !== query.commit) return false;

    if (query.timestamp_start && new Date(log.timestamp) < new Date(query.timestamp_start)) return false;
    if (query.timestamp_end && new Date(log.timestamp) > new Date(query.timestamp_end)) return false;

    return true;
  });
}

router.get("/", async (req, res) => {
  try {
    const logs = await readLogs();

    const filtered = filterLogs(logs, req.query);

    res.json(filtered);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
