const tokenGenerator = require('../twilio/tokenGenerator');
const validateRoom = require('../validation/roomValidation');
const Room = require('../models/Room');
const User = require('../models/User');

module.exports = app => {
    app.get('/api/rooms/:email', async function(req, res) {
        const existingUser = await User.findOne({
            email: req.params.email
        }).populate("rooms")
        const filteredRoom = existingUser.rooms.map(eachRoom => {
            return {
                roomID: eachRoom.roomID
            }
        }
           )
        res.send(filteredRoom)
    })
    app.post('/api/roomchat', async (req, res) => {
        const { errors, isValid } = validateRoom(req.body.room)
        const { roomID, password } = req.body.room
        if(!isValid) {
            return res.status(400).json(errors)
        }

        const existingRoom = await Room.findOne({
            roomID
        }) 

        if(existingRoom) {
            if(password !== existingRoom.password) {
                return res.status(400).json({password_room: 'Wrong password!'})
            } else {
                const identity = req.body.identity || 'identity'
                const room = req.body.room;
                res.send(tokenGenerator(identity, room));
            }
        } else {
            return res.status(400).json({roomID: 'Room not found'})
        }
    })

    app.post('/api/createRoom', async (req, res) => {
        const { errors, isValid } = validateRoom(req.body.room)
        const { user } = req.body
        const { roomID, password } = req.body.room

        if(!isValid) {
            return res.status(400).json(errors)
        }
        const existingRoom = await Room.findOne({
            roomID
        })   
        if(existingRoom) {
                return res.status(400).json({
                    password_room: 'Room already exists'
                })
        } else {
            const newRoom = new Room({
                roomID,
                password
            })
            const room = await newRoom.save()
            const existingUser = await User.findOne({email: user.email})
            const update = {
                rooms: [...existingUser.rooms, room]
            }
            let userUpdate = await User.findOneAndUpdate({ email: user.email }, update, {
                new: true
            })
            res.json(room)
        }
    })

    app.put('/api/room/:roomID', async (req, res) => {
        const { roomID } = req.params
        const { password } = req.body
        const { errors, isValid } = validateRoom({ roomID, password })

        if(!isValid) {
            return res.status(400).json({edit_password: "Password is required"})
        } 
        const update = {
            password
        }
        let roomUpdate = await Room.findOneAndUpdate({ roomID }, update, {
            new: true
        })
        res.json(roomUpdate)
    })

    app.delete('/api/room/:userEmail/:roomID', async (req, res) => {
        const { roomID, userEmail } = req.params

        const existingUser = await User.findOne({
            email: userEmail
        }).populate("rooms")

        const updateRooms = existingUser.rooms.filter(eachRoom => eachRoom.roomID !== roomID)

        const updateUser = await existingUser.updateOne({ rooms: updateRooms }, {
            new: true
        } )

        await Room.findOneAndDelete({roomID: roomID})

        res.send(updateUser)

    })
}