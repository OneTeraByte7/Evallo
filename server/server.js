const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const logsRoute = require("./routes/logs");
app.use("/logs", logsRoute);


const logFilePath = path.join(__dirname, "logs.json");
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, "[]", "utf8");
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
