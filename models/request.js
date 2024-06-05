const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    requesterId: { type: Schema.Types.ObjectId, ref: "Profile" },
    acceptorId: { type: Schema.Types.ObjectId, ref: "Profile" }
})

RequestSchema.virtual("url").get(function () {
    return `/request/${this._id}`
})

module.exports = mongoose.model("Request", RequestSchema);