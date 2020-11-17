const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./models/User')

mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const app = express()

app.use(bodyParser.json())
//tell passport to make use of cookie to handle authentication
app.use(passport.initialize())

require('./routes/authRoutes')(app)
require('./routes/roomChatRoutes')(app)
require('./routes/contactRoutes')(app)

const PORT = process.env.PORT || 5000;
app.listen(PORT)
