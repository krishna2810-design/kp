const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const router = require("./config/route");
const setUpDb = require("./config/database");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/", router);
setUpDb();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("App Started ", PORT);
});
