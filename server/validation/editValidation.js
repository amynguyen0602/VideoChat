const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateEditInput(data) {
    let errors = {};
    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';
    
    if(Validator.isEmpty(data.firstname)) {
        errors.firstname = 'First name field is required';
    }

    if(Validator.isEmpty(data.lastname)) {
        errors.lastname = 'Last name field is required';
    }
    if(data.change_pw_flag) {
        if(!Validator.isLength(data.password, {min: 6, max: 30})) {
            errors.password = 'Password must have at least 6 chars';
        }
    
        if(Validator.isEmpty(data.password)) {
            errors.password = 'Password is required';
        }
    
        if(!Validator.equals(data.password, data.password_confirm)) {
            errors.password_confirm = 'Password and Confirm Password must match';
        }
    
        if(Validator.isEmpty(data.password_confirm)) {
            errors.password_confirm = 'Password is required';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}