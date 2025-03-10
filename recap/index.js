require("dotenv").config();
const express = require("express");
const z = require("zod");

const app = express();
const PORT = process.env.PORT;

const val = z.object({
  username: z.string(),
  password: z.string(),
});

app.use(express.json());

function validation(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (username == "rythem" && password == "goyal") {
    next();
  } else {
    next(err);
  }
}

app.get("/", (req, res) => {
  const { username, password } = req.body;
  try {
    const r = val.safeParse({ username, password });
    if (r == true) {
      res.json({
        success: true,
      });
    } else {
      res.json({
        message: "errorr",
      });
    }
  } catch (err) {
    res.json({
      message: "error",
    });
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.json({
    message: "error",
  });
});

app.listen(PORT, () => {
  console.log("Port running on port", PORT);
});
