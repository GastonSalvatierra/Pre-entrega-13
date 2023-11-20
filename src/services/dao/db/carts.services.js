import cartsModel from "../db/models/carts.js";
import ticketModel from "./models/ticket.js";


export default class cartService {

    getAll = async () => {
        let carts = await cartsModel.find();
        return carts.map(carts=>carts.toObject());
    }

    /* getAll = async () => {
        let carts = await cartsModel.find().populate('products.product.productId');
        
        return carts.map(cart => {
            return {
                _id: cart._id,
                products: cart.products.map(productItem => {
                    return {
                        product: productItem.product.map(product => product.productId),
                        quantity: productItem.quantity,
                        _id: productItem._id
                    };
                }),
                __v: cart.__v
            };
        });
    } */

    save = async (cart) => {
        try {
            const newCart = await cartsModel.create(cart);
            console.log(cart);
            return newCart;
            
        }catch (error) {
            throw error;
        }
    }

    generateTicket = async (product) => {
        try {
            const newTicket = await ticketModel.create(product);
            console.log(newTicket);
            return newTicket;
            
        }catch (error) {
            throw error;
        }
    }

    deleteCart = async (cartId, productId) => {
        try {
            
            const cartExist = await cartsModel.findOne({ _id: cartId });

        cartExist.products = cartExist.products.filter(item => item._id.toString() !== productId);

        await cartExist.save();
            
            
        }catch (error) {
            throw error;
        }
    }

    deleteAll = async (cartId) => {
        try {

            const cartExist = await cartsModel.findOne({ _id: cartId });
        
            cartExist.products = [];

            await cartExist.save();
        
        }catch (error) {
            throw error;
        }
    }


    updateAll = async (cartId,updateProducts) => {
        try {

            const cartExist = await cartsModel.updateOne({ _id: cartId},updateProducts);

            console.log(updateProducts);

        }catch (error) {
            throw error;
        }
    }

    updateCartPopulate  = async (cartId) => {
        try {

            //HAGO EL POPULATE
        let cart = await cartsModel.findOne({_id:cartId});
       
        console.log(JSON.stringify(cart, null, '\t'));

        
        return cart;
        
        }catch (error) {
            throw error;
        }
    }


    updateQuantity = async (cartId,productId,quantity) => {
        try {

            const cartExist = await cartsModel.findOne({ _id: cartId });

            const productIndex = cartExist.products.findIndex(product => product. _id.toString() === productId);

            if (productIndex === -1) {
                throw new Error("El producto no se encontró en el carrito.");
            }

            cartExist.products[productIndex].quantity = quantity;

            await cartExist.save();

            return "Cantidad actualizada con éxito.";

        }catch (error) {
            throw error;
        }
    }
    
};


