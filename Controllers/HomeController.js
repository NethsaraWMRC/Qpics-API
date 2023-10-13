const ImageData = require("../models/Image");

exports.home = async (req,res)=>{
    try{
        const allImageData = await ImageData.find();
        res.json(allImageData)
    }catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'An error occurred' });
    }
}