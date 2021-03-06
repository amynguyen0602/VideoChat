const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    roomID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Room = mongoose.model('rooms', RoomSchema);

module.exports = Room;