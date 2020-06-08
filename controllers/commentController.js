import Content from '../models/Content';
import Comment from '../models/Comment';

// post Comment
export const postComment = async (req, res) => {
    const {
        body : { text },
        params : { id },    // contentId
        user
    } = req;
    
    try {
        const comment = await Comment.create({
            comment : text,
            author : user._id,
            content : id
        });
        res.status(200).json({
            msg : "Success Post Comment",
            comment
        });
        res.end();
    }catch(err) {
        console.log(err);
        res.status(400).json({error:err});
        res.end();
    }
}

export const deleteComment = async (req, res) => {
    const {
        params : { id },
        user
    } = req;

    
    try {
        const comment = await Comment.findOne({_id: id});
        if(`${comment.author}`!== `${user._id}`) {
            console.log(`comment_author : ${comment.author}, user_id : ${user._id}`)
            console.log(`Error with not match author & user_id`)
            throw Error();
        } else {
            await Comment.deleteOne({_id : id});
            res.status(200).json({
                message : "Success To Delete Comment"
            })
        }
    } catch(err) {
        console.log(err);
        res.status(400).json({error:err});
        res.end();
    }
}