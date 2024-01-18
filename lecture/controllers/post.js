exports.afterUploadImage = (req, res) => {
    console.log(req, file);
    res.json({url: `/img/${req.file.filename}`});
};


exports.uploadPost = (req,res,next) => {
    try {

    } catch (e) {
        console.error(e);
        next(e);
    }
};