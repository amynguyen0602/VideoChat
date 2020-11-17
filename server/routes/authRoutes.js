const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/registerValidation');
const validateLoginInput = require('../validation/loginValidation');
const validateEditInput = require('../validation/editValidation');

const User = require('../models/User');

module.exports = app => {

    app.post('/api/users/register', async function(req, res) {
        const { errors, isValid } = validateRegisterInput(req.body)

        if(!isValid) {
            return res.status(400).json(errors)
        }
        const existingUser = await User.findOne({
            email: req.body.email
        })   
        if(existingUser) {
                return res.status(400).json({
                    email: 'Username already exists'
                })
        }
        else {
            const avatarType = ['mp', 'identicon', 'monsterid', 'wavatar', 'retro', 'robohash']
            const randomIndex = Math.floor(Math.random() * Math.floor(avatarType.length))
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: avatarType[randomIndex]
            })
            
            const { firstname, lastname, email, password } = req.body
            const newUser = new User({
                firstname,
                lastname,
                email,
                password,
                avatar
            })
                
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err)
                else {
                    bcrypt.hash(newUser.password, salt, async (err, hash) => {
                        if(err) console.error('There was an error', err)
                        else {
                            newUser.password = hash;
                            const user = await newUser.save()
                            res.json(user)
                            }
                        })
                    }
                })
            }
    })

    app.post('/api/users/login', async (req, res) => {

        const { errors, isValid } = validateLoginInput(req.body)

        if(!isValid) {
            return res.status(400).json(errors)
        }

        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({email})
        if(!user) {
            errors.email = 'User not found'
            return res.status(404).json(errors)
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch) {
        const payload = {
            id: user.id,
            firstname: user.firstname,
            lastname:user.lastname,
            avatar: user.avatar,
            email: user.email
            }
        jwt.sign(payload, 'secret', {
            expiresIn: 3600
            }, (err, token) => {
            if(err) console.error('There is some error in token', err)
                else {
                    res.json({
                        success: true,
                        token: `Bearer ${token}`
                    })
                }
            })
        }
            else {
                errors.password = 'Incorrect Password'
                return res.status(400).json(errors)
            }
                        
            
    })

    app.get('/api/users/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
        return res.json({
            id: req.user.id,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            email: req.user.email,
            avatar: req.user.avatar
        })
    })

    app.post('/api/users/edit', async (req, res) => {

        const { errors, isValid } = validateEditInput(req.body)

        if(!isValid) {
            return res.status(400).json(errors)
        }

        const email = req.body.email

        const user = await User.findOne({email})
        if(!user) {
            errors.email = 'User not found'
            return res.status(404).json(errors)
        }
        if(req.body.change_pw_flag) {
            const { firstname, lastname, password, email } = req.body
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err)
                else {
                    bcrypt.hash(password, salt, async (err, hash) => {
                        if(err) console.error('There was an error', err)
                        else {
                            const hashPassword = hash
                            update = {
                                firstname,
                                lastname,
                                password: hashPassword
                            }
                            let userUpdate = await User.findOneAndUpdate({email}, update, {
                                new: true
                            })
                            const payload = {
                                id: userUpdate.id,
                                firstname: userUpdate.firstname,
                                lastname:userUpdate.lastname,
                                avatar: userUpdate.avatar,
                                email: userUpdate.email
                                }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                                }, (err, token) => {
                                if(err) console.error('There is some error in token', err)
                                    else {
                                        res.json({
                                            success: true,
                                            token: `Bearer ${token}`
                                        })
                                    }
                                })
                            }
                        })
                    }
                })   
        } else {
            const { firstname, lastname } = req.body
            update = {
                firstname,
                lastname
            }
            let userUpdate = await User.findOneAndUpdate({email}, update, {
                new: true
            })
            const payload = {
                id: userUpdate.id,
                firstname: userUpdate.firstname,
                lastname:userUpdate.lastname,
                avatar: userUpdate.avatar,
                email: userUpdate.email
                }
            jwt.sign(payload, 'secret', {
                expiresIn: 3600
                }, (err, token) => {
                if(err) console.error('There is some error in token', err)
                    else {
                        res.json({
                            success: true,
                            token: `Bearer ${token}`
                        })
                    }
                })
        }
    })
}