import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    content : {
        type: mongoose.Types.ObjectId,
        ref : "Content",
        required : "Content is reqruied"
    },
    author : {
        type : mongoose.Types.ObjectId,
        ref: "User",
        required : "Author is required"
    },
    comment : {
        type: String,
        required : "Comment is required"
    },
    createdAt : {
        type: Date,
        default : Date.now
    }  
})

const model = mongoose.model("Comment", CommentSchema);

export default model;