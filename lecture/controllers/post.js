const Post = require('../models/post');
const Hashtags = require('../models/hashtag');

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({url: `/img/${req.file.filename}`});
};


exports.uploadPost = async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });

        const hashtags = req.body.content.match(/#[^\s#]*/g);

        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => {
                return Hashtags.findOrCreate({
                    where: {title: tag.slice(1).toLowerCase()}
                });
            }));
            console.log(result);
            await post.addHashtags(result.map(r=>r[0]))
        }
        res.redirect('/');

    } catch (e) {
        console.error(e);
        next(e);
    }
};