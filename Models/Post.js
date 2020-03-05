const mongoose = require("mongoose");
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    avatar: {
        type: String
    },
    name:{
        type:String
    },
    going: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    }],
    location:{
        address:{
            type:String
        },
        geometry:{
            lat:{
                type:Number
            },
            lng:{
                type:Number
            }
        }
    },
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model("post", PostSchema);