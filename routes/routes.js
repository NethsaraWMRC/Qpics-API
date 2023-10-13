const express = require("express");
const { regUser, loginUser } = require("../Controllers/UserController");
const { uploadImg } =  require("../Controllers/ImageController")
const { profile } = require("../Controllers/ProfilesController")
const { home } = require("../Controllers/HomeController")
const auth = require("../middlewares/authMiddleware")
const multer = require('multer');

const router = express.Router();

router.post('/register', regUser)
router.post('/login', loginUser)

// uploading images
const storage = multer.memoryStorage(); // This stores the file in memory
const upload = multer({ storage: storage });

router.post('/upload',auth,upload.single('image'), uploadImg)

//get images into profile
router.get('/profile', auth, profile)

//get images into homepage
router.get('/home', home)

module.exports = router;