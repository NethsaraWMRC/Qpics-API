const Image = require('../models/Image');
const admin = require("firebase-admin");
const User = require('../models/user');
const path = require('path');
const auth = require("../middlewares/authMiddleware");
const streamifier = require('streamifier');


exports.uploadImg = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user_id });

  if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
  }

  const bucket = admin.storage().bucket();
  const file = req.file;
  const {title, tag1} = req.body;

  // Convert the Buffer to a readable stream using streamifier
  const fileStream = streamifier.createReadStream(file.buffer);
  
  const fileUpload = bucket.file(file.originalname); // You can adjust the destination file name as needed

  const writeStream = fileUpload.createWriteStream({
      metadata: {
          contentType: file.mimetype,
      },
  });

  // Handle stream events (error, finish, etc.)
  writeStream.on('error', (err) => {
      console.error("Error uploading image:", err);
      res.status(500).json({ error: 'Image upload failed' });
  });

  writeStream.on('finish', async () => {
      try {
          // Get the signed URL of the uploaded image
          const signedUrls = await fileUpload.getSignedUrl({
              action: "read",
              expires: "01-01-2099" // Adjust the expiration date as needed
          });
          const imgUrl = signedUrls[0];

          const newImage = new Image({
              user: user._id,
              imageUrl: imgUrl,
              title,
              tag1,
          });

          await newImage.save();
          res.status(201).json({ message: 'Image uploaded successfully' }); // Send the success response here
      } catch (error) {
          console.error("Error getting signed URL:", error);
          res.status(500).json({ error: 'Image processing failed' }); // Send the error response here
      }
  });

  // Pipe the file stream to the write stream
  fileStream.pipe(writeStream);
};
