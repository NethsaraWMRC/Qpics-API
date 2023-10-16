const ImageData = require('../models/Image')
const admin = require("firebase-admin");
const path = require('path');

exports.updateImage = async (req, res)=>{
    try{
        const imageId = req.params.imageId;
        const { title, tag1} = req.body;

        const updateImg = {
            title,
            tag1
        }

        const currentImage = await ImageData.findByIdAndUpdate(imageId, updateImg).then(()=>{
            res.status(200).send({status:"record is updated"})
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({status:"error with update record", error:err.message})
        })
    }catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

exports.deleteImage = async (req, res)=>{
    try{
        const imageId = req.params.imageId;
        const currentImage = await ImageData.findById(imageId);

        await ImageData.findByIdAndDelete(imageId).then(()=>{
            res.status(200).send({status:"image is deleted"})
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({status:"error with delete record", error:err.message})
        })

        //  // Delete the corresponding image file from Firebase Storage
        //  const bucket = admin.storage().bucket();
        //  const file = bucket.file(path.basename(currentImage.imageUrl)); // Assuming imageUrl is the full path
 
        //  // Use the delete method to remove the file from Firebase Storage
        //  await file.delete();


    }catch (error) {
        console.error("Error:", error);
        res.status(500);
    }
}

exports.getImage = async (req,res)=>{
    try{
        const imageId = req.params.imageId;

        const currentImage = await ImageData.findById(imageId).then((imgData)=>{
            res.status(200).json(imgData)
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({status:"error with fetch record", error:err.message})
        })

    }catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'An error occurred' });
    }
}
