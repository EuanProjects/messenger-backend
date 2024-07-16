const Request = require("../models/request");
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');


exports.requestPost = asyncHandler(async (req, res, next) => {
    console.log("request post");
    const newRequest = new Request({
        requesterId: req.body.requesterId,
        acceptorId: req.body.acceptorId
    })
    const savedRequest = await newRequest.save();
    res.send(savedRequest);
})


