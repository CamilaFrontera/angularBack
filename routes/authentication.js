//Importo lo necesario
const {Router} = require('express');
const { check } = require('express-validator');
const {addToCart, clearCart,getCart,removeFromCart} = require('../controllers/cart.controller')
const { register, authenticate, login } = require('../controllers/authentication.controller');
const { fieldValidation } = require('../middlewares/field-validation');
const { jwtValidation } = require('../middlewares/jwt-validation');

const router = Router();

//ruta para registro
router.post('/register', [
    check('name', 'The name field is required.').not().isEmpty(),
    check('lastname', 'The lastname field is required').not().isEmpty(),
    check('username', 'An username is required').not().isEmpty(),
    check('email', 'The email field is required.').isEmail(),
    check('password','The password field is required').isLength({min: 4}),
    fieldValidation
], register);

//ruta para loin
router.post('/login',[
    check('username', 'The username field is required.').isLength({min: 3}),
    check('password', 'The password field is required.').isLength({min: 4}),
    fieldValidation
] , login);

//ruta para validar
router.get('/revalidate', jwtValidation, authenticate);

//carrito
router.get('/cart',[
    getCart
]);

router.post('/cart',[addToCart]);

router.delete('/cart',[
    removeFromCart
]);

router.delete('/cart/clear',[
    clearCart
])
// app.route('/api/cart')
// .get(checkToken, getCart)          
// .post(checkToken, addToCart)     
// .delete(checkToken, removeFromCart)    

// app.route('/api/cart/clear')  
// .delete(clearCart)

//exporto router
module.exports = router;