const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(require("./routes"));
app.use(cors());
mongoose.connect("mongodb://localhost:27017/assignment");
app.listen(port, async () => {
  console.log(`Listening on port: ${port}`);
});

process.on("SIGINT", async function () {
  await mongoose.disconnect();
  process.exit(0);
});
