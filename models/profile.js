const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    username: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    setup: { type: Boolean },
    requests: [{ type: Schema.Types.ObjectId, ref: "" }]
})

ProfileSchema.virtual('url').get(function () {
    return `/profile/${this._id}`;
});

module.exports = mongoose.model("Profile", ProfileSchema);