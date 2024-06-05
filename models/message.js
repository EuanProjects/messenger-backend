const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    timestamp: { type: Date },
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
    message: { type: String },
    profileId: { type: Schema.Types.ObjectId, ref: "Profile"}
})

MessageSchema.virtual("url").get(function () {
    return `/message/${this._id}`
})

module.exports = mongoose.model("Message", MessageSchema);