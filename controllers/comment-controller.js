const { Comment, Pizza } = require('../models');

const commentController = {
    // add comment to pizza
    /*
    Remember that when we create a comment, it’s not a standalone comment; 
    it belongs to a pizza. We need to know exactly which pizza we’re working with.
    */
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({_id}) => {
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $push: { comments: _id }}, // $push method adds data to an array.
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));

    },

    addReply( { params, body }, res ) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    // remove comment
    removeComment( {params}, res) {
        Comment.findOneAndDelete( { _id: params.commentId })
            .then(deletedComment => {
                if(!deletedComment) {
                    return res.status(404).json({ message: 'No comment with this id!' });
                }
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $pull: { comments: params.commentId }},
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id' });
                    return;
                }
                res.json(dbPizzaData)
            })
            .catch(err => res.json(err));
    },

    // remove reply
    removeReply({ params }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $pull: { replies: { replyId: params.replyId }}},
            { new: true }
        )
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
        
    }
};

module.exports = commentController;

/*
All of the MongoDB-based functions like $push start with a dollar sign ($), 
making it easier to look at functionality and know what is built-in to MongoDB 
and what is a custom noun the developer is using.
*/