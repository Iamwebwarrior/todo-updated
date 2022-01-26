const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: false,
            default:"",
        },
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("List", PostSchema);  //this will create lists collection in mongo
