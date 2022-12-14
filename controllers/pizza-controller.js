const { Pizza } = require('../models');

const pizzaController = {
    // the functions will go in here as methods
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .then(dbPizzaData => {  
                // if no pizza is found, send 404(not found)
                if(!dbPizzaData) {
                    res.status(404).json({message: 'No pizza found with this id!'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create pizza
    createPizza({body}, res) {
        console.log('===', body)
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // update pizza by id
    /* 
    Mongoose finds a single document we want to update, then updates it and returns the updated document. 
    If we don't set that third parameter, { new: true }, it will return the original document. 
    By setting the parameter to true, we're instructing Mongoose to return the new version of the document.
    */
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id}, body, { new: true })
            .then(dbPizzaData => {
                if(!dbPizzaData) {
                    res.status(404).json({message: 'No pizza found with this id!'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete pizza
    // Mongoose .findOneAndDelete() method, which will find the document to be returned and also delete it from the database.
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({_id: params.id})
            .then(dbPizzaData => {
                if(!dbPizzaData) {
                    res.status(404).json({message: 'No pizza found with this id!'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = pizzaController;