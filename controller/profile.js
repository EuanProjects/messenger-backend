const Profile = require("../models/profile");
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const conversation = require("../models/conversation");
require('dotenv').config()



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
                const session = await mongoose.startSession();
                session.startTransaction();

                const starterProfiles = process.env.STARTER_PROFILES.split(",");
                console.log(starterProfiles);

                const newProfile = new Profile({
                    username: req.body.username,
                    picture: "",
                    name: "",
                    password: hashedPassword,
                    friends: starterProfiles,
                    setup: false,
                });

                console.log(newProfile);
                const savedProfile = await newProfile.save();

                for (let i = 0; i < starterProfiles.length; i++) {
                    await Profile.findByIdAndUpdate(starterProfiles[i], {
                        $push: { friends: newProfile._id }
                    });
                }

                const curDate = new Date()
                const conversation1 = new Conversation({
                    profileIds: [...starterProfiles, newProfile._id],
                    theme: "Default",
                    lastUpdated: curDate,
                    lastMessage: null,
                })
                
                await conversation1.save();

                const conversation2 = new Conversation({
                    profileIds: [starterProfiles[1], newProfile._id],
                    theme: "Default",
                    lastUpdated: curDate,
                    lastMessage: null,
                })
                
                await conversation2.save();

                const message = new Message({
                    timestamp: curDate,
                    conversationId: conversation2._id,
                    message: `Hello ${newProfile.username}!`,
                    profileId: starterProfiles[1]
                })

                await message.save();

                await session.commitTransaction();
                session.endSession();
                return res.send('Profile created successfully');
            } catch (err) {
                return next(err);
            }
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
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

