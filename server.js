const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKeyserviceAccountKey.json");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3030;
const URL = process.env.MONGODB_URL;

//mongoDB
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

//firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://qpics-f0077.appspot.com",
});

const userRoutes = require("./routes/routes.js");
const { populate } = require("./models/Image");
app.use("/api", userRoutes);

connection.once("open", () => {
  console.log("MongoDB connection succssesful.");
});

app.listen(PORT, () => {
  console.log("server is running...");
});
