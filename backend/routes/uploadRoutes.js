import express from "express";
import multer from "multer";
import path from "path";

// DOCUMENTATION
// MULTER is an NPM Package used to upload files, We are using it here to upload .JPG files.
// The Path module provides a way of working with directories and file paths.
// cb is a call back function, null is for error, file (.) gives us methods to use for file names and details. path.extname automatically adds a (.).
// since we need to instantiate from the upload folder so we have created a route specifically for uploads so that all the validations and express route can be resolved from one file/component.
// A media type (also known as a Multipurpose Internet Mail Extensions or MIME type) indicates the nature and format of a document, file, or assortment of bytes.

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname} - ${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Sorry! you can only upload Images.");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
