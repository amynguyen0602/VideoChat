const validateAddContactInput = require('../validation/addContactValidation')

const User = require('../models/User')

module.exports = app => {
    app.post('/api/fetch_contact', async function(req, res) {
        const existingUser = await User.findOne({
            email: req.body.email
        }).populate("contact")
        const filteredContact = existingUser.contact.map(eachContact => {
            return {
                email: eachContact.email,
                firstname: eachContact.firstname,
                lastname: eachContact.lastname,
                avatar: eachContact.avatar
            }
        }
           )
        res.send(filteredContact)
    })

    app.post('/api/add_contact', async function(req, res) {
        const { contact, user } = req.body
        const { errors, isValid } = validateAddContactInput(contact)

        if(!isValid) {
            return res.status(400).json(errors)
        }
        const existingEmail = await User.findOne({
            email: contact.email
        })   
        if(!existingEmail) {
                return res.status(400).json({
                    email: 'User not found!'
                })
        }
        else {
            const existingUser = await User.findOne({
                email: user.email
            })  
            if(existingUser.contact.includes(existingEmail._id)) {
                return res.status(400).json({
                 email: 'Contact already exists!'
                })
            } else {
                const update = {
                    contact: [...existingUser.contact, existingEmail]
                }
                let userUpdate = await User.findOneAndUpdate({ email: user.email }, update, {
                    new: true
                })
    
                const secondUpdate = {
                    contact: [...existingEmail.contact, existingUser]
                }
                await User.findOneAndUpdate({ email: contact.email }, secondUpdate, {
                    new: true
                })
                res.send(userUpdate.populate("contact"))
            }
        }
    })
}