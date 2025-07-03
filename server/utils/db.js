const fs = require("fs-extra");
const path = require("path");

const DB_PATH = path.join(__dirname, "../data/logs.json");

async function readLogs() {
  try {
    await fs.ensureFile(DB_PATH);
    const data = await fs.readFile(DB_PATH, "utf8");
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading logs.json:", err);
    return [];
  }
}

async function writeLogs(logs) {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(logs, null, 2));
  } catch (err) {
    console.error("Error writing logs.json:", err);
  }
}

module.exports = { readLogs, writeLogs };
