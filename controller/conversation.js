const Conversation = require("../models/conversation");
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.conversationDetail = asyncHandler(async (req, res, next) => {
    const conversation = await Conversation.findById(req.params.conversationId)
        .populate({
            path: 'profileIds',
            select: 'username'
        })
        .exec();
    res.send(conversation);
})

exports.conversationDetailProfileId = asyncHandler(async (req, res, next) => {
    // const friendId = new ObjectId(req.params.profileId);
    // const conversations = await Conversation.find({ profileIds : friendId })
    const conversations = await Conversation.find({ profileIds: req.params.profileId })
        .populate({
            path: 'profileIds',
            select: 'username'
        })
        .exec();
    res.send(conversations);
})

exports.conversationAllDetail = asyncHandler(async (req, res, next) => {
    const conversations = await Conversation.find()
        .populate({
            path: 'profileIds',
            select: 'username'
        })
        .exec();
    res.send(conversations);
})

exports.conversationPost = asyncHandler(async (req, res, next) => {
    const newConversation = new Conversation({
        profileIds: req.body.profileIds,
        theme: "Default",
        lastUpdated: new Date()
    })

    const savedConversation = await newConversation.save();
    res.send(savedConversation);
})

exports.conversationThemePut = asyncHandler(async (req, res, next) => {
    const updatedConversation = await Conversation.findByIdAndUpdate({ _id: req.params.conversationId }, { theme: req.body.theme }, { new: true });
    res.send(updatedConversation);
})