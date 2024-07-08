const Profile = require("../models/profile");
const asyncHandler = require("express-async-handler");


// figure out which routes I need to restrict
exports.profileGet = asyncHandler(async (req, res, next) => {
    console.log("get");
    const allProfiles = await Profile.find().exec();

    res.send(allProfiles);
})

exports.profilePost = asyncHandler(async (req, res, next) => {
    // check if username exists first
    
    console.log(req.username, req.password);
    const newProfile = new Profile({
        username: req.body.username,
        password: req.body.password,
        friends: [],
        setup: false,
        request: [],
    })
    const savedProfile = await newProfile.save();

    res.send(savedProfile);
})
