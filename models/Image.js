const mongoose = require("mongoose");

const schema = mongoose.Schema;

const imageSchema = new schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref:"user", require:"true"},
    imageUrl : {type: String, require: true},
    title : {type:String, require: true},
    tag1 : {type:String, require: true},
    tag2 : {type:String},
})

const image=  mongoose.model("Image", imageSchema);

module.exports = image;