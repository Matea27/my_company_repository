const mongoose = require("mongoose")
const { default: validator } = require("validator")

//Owner model
const Owner = mongoose.model("Owner", {
    name: {
        type: String,
        trip: true,
        required: true
    },
    surname: {
        type: String,
        trim: true,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    }
})


module.exports = Owner