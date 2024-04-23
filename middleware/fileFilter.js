const fileFilter = (req, file, cb) => {
  // Define the allowed file types
  const allowedMimeTypes = ["image/jpeg", "image/png"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error("Invalid file type. Only JPEG and PNG files are allowed."));
  }
};

module.exports = fileFilter;
