
let cartContent = [];

const getCart = (req, res) => {
    res.send(cartContent);
}


const addToCart = (req, res) => {
    const itemToAdd = req.body;
    console.log(itemToAdd)
    if (cartContent.findIndex(movie => movie.imdbID === itemToAdd.imdbID) < 0){
        cartContent.push(itemToAdd);   
        res.send({
            status: true,
            cartContent
        });
    } else {
        console.log('No se pudo agregar'),
        res.send({
            
            status: false,
            description: "The movie that you're trying to add already exists in cart.",
            cartContent
        });
    }
}

const removeFromCart = (req, res) => {
    
    const indextoRemove = cartContent.findIndex(movie => movie.imdbID === movie.imdbID);

    if (indextoRemove >= 0) {
        cartContent.splice(indextoRemove, 1);
        res.send({
            status: true,
            cartContent
        });
    } else {
        res.send({
            status: false,
            description: "We're sorry, we coulnd't find that movie.",
            cartContent
        });
    }
    cartContent.forEach(movie=> console.log(movie))
}

const clearCart = (req, res) => {
    cartContent = [];
    res.send({
        status: true,
        cartContent
    });
}

module.exports = {
    clearCart: clearCart,
    removeFromCart: removeFromCart,
    addToCart: addToCart,
    getCart: getCart
}
