const router = require('express').Router();
const {
    getAllPizza,
    getPizzaById, 
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

// setup get all and post at /api/pizzas
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

// setup get one, put, delete at /api/pizzas/:id
router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

module.exports = router;


/*
The following variations achieve the same goal:
// this code
router.route('/').get(getCallbackFunction).post(postCallbackFunction);

// is this same as this
router.get('/', getCallbackFunction);
router.post('/' postCallbackFunction);
*/