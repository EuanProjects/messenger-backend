const Profile = require("../models/profile");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");


// figure out which routes I need to restrict
exports.profileGet = asyncHandler(async (req, res, next) => {
    console.log("get");
    const allProfiles = await Profile.find().exec();

    res.send(allProfiles);
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
                    password: hashedPassword,
                    friends: [],
                    setup: false,
                    request: [],
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

