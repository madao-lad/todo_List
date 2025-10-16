const mongoose = require("mongoose");

const taskScehma = mongoose.Schema({
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    title: {
        type:String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    }
});

module.exports = mongoose.model("taskScehma", taskScehma);