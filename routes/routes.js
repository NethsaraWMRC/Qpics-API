const express = require("express");
const { regUser, loginUser, getUser } = require("../Controllers/UserController");
const { uploadImg } =  require("../Controllers/ImageController")
const { profile } = require("../Controllers/ProfilesController")
const { home } = require("../Controllers/HomeController")
const { updateImage, deleteImage, getImage } = require("../Controllers/EditImageController")
const auth = require("../middlewares/authMiddleware")
const multer = require('multer');

const router = express.Router();

router.post('/register', regUser)
router.post('/login', loginUser)

//get images into profile
router.get('/user', auth, getUser)

// uploading images
const storage = multer.memoryStorage(); // This stores the file in memory
const upload = multer({ storage: storage });

router.post('/upload',auth,upload.single('image'), uploadImg)

//get images into profile
router.get('/profile', auth, profile)

//get images into homepage
router.get('/home', home)

//update image data
router.put('/update/:imageId', auth, updateImage)

//delete image 
router.delete('/delete/:imageId', auth, deleteImage)

//delete image 
router.get('/get/:imageId', auth, getImage)

module.exports = router;