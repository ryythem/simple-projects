const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only pdf file allowed"));
    }
    cb(null, true);
  },
});

app.post("/uploads", upload.single("pdfFile"), (req, res) => {
  if (!req.file) {
    res.json({
      message: "No file uploaded",
    });
  }
  res.json({
    message: "file uploaded successfully",
    filename: req.file.filename,
  });
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
