const Profile = require("../models/profile");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");


exports.profilesGet = asyncHandler(async (req, res, next) => {
    const allProfiles = await Profile.find()
        .select("name picture")
        .exec();

    res.send(allProfiles);
})

exports.profileGet = asyncHandler(async (req, res, next) => {
    const user = req.user;
    res.send({profileId: user.user._id, setup: user.user.setup, picture: user.user.picture});
})

exports.profileIdGet = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findById(req.params.profileId)
        .select("username name picture")
        .exec();
    res.send(profile);
})

exports.profilePut = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findByIdAndUpdate(req.params.profileId, req.body, {new : true}).exec()
    res.send(profile)
})

exports.profilePost = asyncHandler(async (req, res, next) => {
    try {
        const profile = await Profile.find({ username: req.body.username });
        if (profile.length > 0) {
            return res.status(400).send('Profile already exists');
        }

        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) {
                return next(err); 
            }

            try {
                const newProfile = new Profile({
                    username: req.body.username,
                    picture: "",
                    name: "",
                    password: hashedPassword,
                    friends: [],
                    setup: false,
                });
                const savedProfile = await newProfile.save();
                return res.send('Profile created successfully');
            } catch (err) {
                return next(err);
            }
        });
    } catch (err) {
        return next(err);
    }
});

exports.profileFriendsGet = asyncHandler(async (req, res, next) => {
        const friends = await Profile.findById(req.params.profileId)
            .select("friends")
            .populate({
                path: "friends",
                select: "username name picture"
            })
            .exec();
        res.send(friends.friends);
})

