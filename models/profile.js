const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    picture: { type: String },
    name: { type: String },
    username: { type: String },
    password: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    setup: { type: Boolean },
})

ProfileSchema.virtual('url').get(function () {
    return `/profile/${this._id}`;
});

module.exports = mongoose.model("Profile", ProfileSchema);