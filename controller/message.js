const Message = require("../models/message")
const asyncHandler = require("express-async-handler");

exports.messageGet = asyncHandler(async (req, res, next) => {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId });

    res.send(messages);
})

exports.messagesPost = asyncHandler(async (req, res, next) => {
    const newMessage = new Message({
        timestamp: new Date();
        conversationId: req.body.conversationId,
        message: req.body.message,
        profileId: req.body.profileId
    })

    const savedMessage = await newMessage.save();
    res.send(savedMessage);
})