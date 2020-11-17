const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRoomInput(data) {
    let errors = {};
    data.roomID = !isEmpty(data.roomID) ? data.roomID : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    
    if(Validator.isEmpty(data.roomID)) {
        errors.roomID = 'Room ID field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password_room = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}