const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    writtenBy: {
        type: String
    },
    commentBody: {
        stype: String
    },
    createAt: {
        type: Date,
        default: Date.now
    }

});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;