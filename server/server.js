const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logsRouter = require("./routes/logs");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/logs", logsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
