const User = require("../models/user");
const ImageData = require("../models/Image");

exports.profile = async (req, res) => {
  try {
    // Retrieve the user based on the logged-in user's ID
    const user = await User.findOne({ _id: req.user.user_id });
    // console.log(user)

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Query the ImageData collection to find all documents where the user field matches the user's ID
    const imgData = await ImageData.find({ user: user._id });

    // Send the image data as a JSON response
   
    res.json(imgData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
