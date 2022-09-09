const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create schema
const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String,
            required: true,
            trim: true  // removes white space before and after the input string.
        },
        createdBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
            /*
            With this get option in place, every time we retrieve a pizza, 
            the value in the createdAt field will be formatted by the dateFormat() function 
            and used instead of the default timestamp value. 
            */
        },
        size: {
            type: String,
            required: true,
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
            default: 'Large'
        },
        toppings: [],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
            // The ref property is especially important because it tells 
            // the Pizza model which documents to search to find the right comments.
        ]
    },

    
    {
        toJSON: {
            virtuals: true,   // we need to tell the schema that it can use virtuals.
            getters: true   // we'll need to tell the Mongoose model that it should use any getter function we've specified.

        },
        id: false
        // We set id to false because this is a virtual that Mongoose returns, and we don’t need it.
    }
);

/*
Because we only care about comment count in respect to pizzas, we'll add the virtual to models/Pizza.js.
Add the following code after the schema:
*/

/*
Virtuals allow you to add virtual properties to a document that aren't stored in the database. 
They're normally computed values that get evaluated when you try to access their properties. 
we need to tell the schema that it can use virtuals.
*/

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce( (total, comment ) => total + comment.replies.length + 1, 0 );
});

// create the Pizza model using the pizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;