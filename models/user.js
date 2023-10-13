const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
    username : {type: String, require:true},
    email : {type: String,unique:true, require:true},
    password : {type: String, require:true},
    
})

const user=  mongoose.model("Users", userSchema);

module.exports = user;