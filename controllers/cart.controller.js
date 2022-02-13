
let cartContent = [];

const getCart = (req, res) => {
    res.send(cartContent);
}


const addToCart = (req, res) => {
    const itemToAdd = req.body;

    if (cartContent.findIndex(movie => movie.id === itemToAdd.id) < 0) {
        cartContent.push(itemToAdd);   
        res.send({
            status: "OK-ADDED",
            description: "ADD MOVIE",
            cartContent
        });
    } else {
        res.send({
            status: "NOT OK",
            description: "NOT ADDING - MOVIE ALLREADY EXIST",
            cartContent
        });
    }
}

const removeFromCart = (req, res) => {
    const urlId = req.query.id;
    const indextoRemove = cartContent.findIndex(movie => movie.id === urlId);

    if (indextoRemove >= 0) {
        cartContent.splice(indextoRemove, 1);
        res.send({
            status: "OK-DELETED",
            description: "DELETED MOVIE",
            cartContent
        });
    } else {
        res.send({
            status: "NOT OK",
            description: "MOVIE NOT FOUND TO ERASE",
            cartContent
        });
    }

}

const clearCart = (req, res) => {
    cartContent = [];
    res.send({
        status: "OK",
        description: "CART WAS EMPTY",
        cartContent
    });
}

module.exports = {
    clearCart: clearCart,
    removeFromCart: removeFromCart,
    addToCart: addToCart,
    getCart: getCart
}
