const Message = require("../models/message");
const Conversation = require("../models/conversation");
const asyncHandler = require("express-async-handler");

exports.messageGet = asyncHandler(async (req, res, next) => {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId })
        .populate({
            path: 'profileId',
            select: 'username'
        })
        .exec();

    res.send(messages);
})

exports.messagesPost = asyncHandler(async (req, res, next) => {
    const newMessage = new Message({
        timestamp: new Date(),
        conversationId: req.params.conversationId,
        message: req.body.message,
        profileId: req.body.profileId
    })

    const savedMessage = await newMessage.save();

    await Conversation.findByIdAndUpdate(req.params.conversationId, {
        lastUpdated : new Date(),
        lastMessage: newMessage._id
    })
    
    res.send(savedMessage);
})