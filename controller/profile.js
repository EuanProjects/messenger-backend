const Profile = require("../models/profile");
const asyncHandler = require("express-async-handler");


// figure out which routes I need to restrict
exports.profileGet = asyncHandler(async (req, res, next) => {
    console.log("get");
    const allProfiles = await Profile.find().exec();

    res.send(allProfiles);
})

exports.profilePost = asyncHandler(async (req, res, next) => {
    console.log("post");
    const newProfile = new Profile({
        username: req.username,
        password: req.password,
        friends: [],
        setup: false,
        request: [],
    })
    const savedProfile = await newProfile.save();

    res.send(savedProfile);
})
