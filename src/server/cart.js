'use strict';

const add = (cart, req) => {
    cart.contents.push(req.body);
    return { name: req.body.title, newCart: JSON.stringify(cart, null, 4) };
};

const change = (cart, req) => {
    const find = cart.contents.find(el => el.id === +req.params.id);
    find.quantity += req.body.quantity;
    return { name: find.title, newCart: JSON.stringify(cart, null, 4) };
};

/**
 * Добавили новый метод удаления
 * @param cart
 * @param req
 * @returns {{newCart: *, name: *}}
 */
const remove = (cart, req) => {
    const find = cart.contents.find(el => el.id === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    return { name: find.title, newCart: JSON.stringify(cart, null, 4) };
};

module.exports = {
    add,
    change,
    remove,
};
