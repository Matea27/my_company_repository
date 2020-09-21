const mongoose = require("mongoose")
const { default: validator } = require("validator")

//Company model - provides an interface to our database MongoDB
const Company = mongoose.model("Company", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "Denmark"
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email")
            }
        }
    },
    phone_number: {
        type: String,
        required: true,
        trim: true, 
        validate(value){
            if(!validator.isLength(value, {min: 10})){
                throw new Error("Must contain at least 10 numbers in the length")
            }
        } 
    }, 
    owner: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Owner" }
    ]
})

module.exports = Company