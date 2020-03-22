const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginrInput(data){
    let errors = {};

     // Convert empty fields to empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

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

    return {
        errors,
        isValid: isEmpty(errors)
    };
};