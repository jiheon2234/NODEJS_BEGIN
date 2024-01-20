const User = require('../models/user');
exports.follow = async (req, res, next) => {
    //req.user.id, req.params.id

    try {
        const user = await User.findOne({where: {id: req.user.id}});
        if (user) {
            user.addFollowing(parseInt(req.params.id));
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
};

exports.unfollow = async (req, res, next) => {
    User.findByPk(req.params.id)
        .then((user) => {
            user.removeFollowing(parseInt(req.user.id));
            res.send('success');
        })
        .catch(e => next(e));
};