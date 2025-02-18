require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  const pw = req.headers.pw;
  res.json({
    message: pw,
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Json format",
  });
});

app.get("/api/:name", (req, res) => {
  const { name } = req.params;
  res.send(`Hello ${name}`);
});

app.listen(PORT, () => {
  console.log("Port running on port", PORT);
});

app.use(express.json());

app.post("/hello", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("Done");
});
