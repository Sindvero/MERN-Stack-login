const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};
    
    // Convert empty fields to empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : "";

    // Name Checks
    if (validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    }

    // Email checks
    if (validator.isEmpty(data.email)){
        errors.email = "Email field required";
    } else if (!validator.isEmail(data.email)){ // If you want, you can also check if it's a hawk email
        errors.email = "Email invalid";
    }

    // Password check
    if (validator.isEmpty(data.password)){
        errors.password = "Password field required";
    }

    if (validator.isEmpty(data.passwordConfirm)){
        errors.passwordConfirm = "Confirm password field required";
    }

    if (!validator.isLength(data.password, {min: 8, max: 32})){
        errors.password = "password must be at least 8 characters";
    }

    if (!validator.equals(data.password, data.passwordConfirm)){
        errors.passwordConfirm = "Password must match"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};