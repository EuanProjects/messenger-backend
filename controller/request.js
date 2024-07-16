const Request = require("../models/request");
const Profile = require("../models/profile");
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');


exports.requestPost = asyncHandler(async (req, res) => {
    console.log("request post");
    const newRequest = new Request({
        requesterId: req.body.requesterId,
        accepterId: req.body.accepterId
    })
    const savedRequest = await newRequest.save();
    res.send(savedRequest);
})

exports.requestGet = asyncHandler(async (req, res) => {
    const requests = await Request.find({
        $or: [
            { requesterId: req.params.profileId },
            { accepterId: req.params.profileId }
        ]
    }).exec();
    res.send(requests);
})

exports.requestPut = asyncHandler(async (req, res) => {
    await Request.findByIdAndDelete(req.params.requestId);

    await Profile.findByIdAndUpdate(req.body.requesterId, {
        $push: { friends: req.body.accepterId }
    });

    await Profile.findByIdAndUpdate(req.body.acceptorId, {
        $push: { friends: req.body.requesterId }
    });

    res.send({});
})


