const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    profileIds: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    theme: { type: String },
    lastUpdated: { type: Date }
})

ConversationSchema.virtual("url").get(function () {
    return `/conversation/${this._id}`;
})

module.exports = mongoose.model("Conversation", ConversationSchema);