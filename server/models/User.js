const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    contact: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    rooms:[{ type: Schema.Types.ObjectId, ref: 'rooms' }]
});

const User = mongoose.model('users', UserSchema);

module.exports = User;