const express = require("express");
const app = express();
const PORT = 4000;
const router = require("./config/route");
const setUpDb = require("./config/database");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/", router);
setUpDb();
app.listen(PORT, () => {
  console.log("App Started ", PORT);
});
