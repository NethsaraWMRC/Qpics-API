const ImageData = require('../models/Image')

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

        const currentImage = await ImageData.findByIdAndDelete(imageId).then(()=>{
            res.status(200).send({status:"image is deleted"})
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({status:"error with delete record", error:err.message})
        })


    }catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'An error occurred' });
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
