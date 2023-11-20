import {cartService} from '../services/factory.js'
import CartDto from '../services/dto/Carts.dto.js';
import { devLogger } from '../config/logger_BASE.js';




export const getCart = async (req, res) => {
    try {
        let carts = await cartService.getAll();
        req.logger = devLogger;
        req.logger.info('exito en getCart');
        res.send(carts);
    } catch (error) {
        req.logger.error('Esto es un error en getCart');
        res.status(500).send({error:  error, message: "No se pudo obtener el carrito."});
    }
}





export const getCartId = async (req, res) => {
    try {
        let cartId = req.params.cid;
        req.logger = devLogger;

        if (!cartId) {
            return res.status(400).send({ message: "El parámetro cid es inválido" });
          }
        
        let carts = await cartService.updateCartPopulate(cartId);
        res.send(carts);
        
    } catch (error) {
        req.logger.error('Esto es un error en getCartId');
        res.status(500).send({error:  error, message: "No se pudo obtener el carrito."});
    }
}

export const cartPurchase = async (req, res) => {

    try {
        let products = req.body;
        req.logger = devLogger;
        req.logger.info(products);
        

        if (!products) {
            return res.status(400).send({ message: "El parámetro es inválido" });
          }
        
        if (req.body.products[0].product[0].stock <= 0) {
            return res.status(400).send({ message: "No hay suficiente stock" });
        }
        
        let confirm = await cartService.generateTicket(req.body.products[0].product[0]);
        res.status(201).send({ message: "Producto comprado con éxito", payload: confirm });


    } catch (error) {
        req.logger.error('Esto es un error en cartPurchase');
        res.status(500).send({error:  error, message: "Hubo un error en la operacion."});
    }
}




export const postCart = async (req, res) => {
    const cartDto = new CartDto (req.body)
    req.logger = devLogger;
    if (!cartDto) {
        return res.status(400).send({ message: "El parámetro cid es inválido" });
      }
    
    try {
        let result = await cartService.save(cartDto);
        res.status(201).send(result);
    } catch (error) {
        req.logger.error('Esto es un error en postCart');
        res.status(500).send({error:  error, message: "No se pudo guardar el carrito."});
    }
}





export const deleteCart = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    req.logger = devLogger;
    if (!cartId || !productId) {
        return res.status(400).send({ message: "El parámetro cid es inválido" });
      }

    try {
        let result = await cartService.deleteCart(cartId, productId);
        res.status(201).send("producto eliminado correctamente");

    } catch (error) {
        req.logger.error('Esto es un error en deleteCart');
        res.status(500).send({error:  error, message: "No se pudo eliminar el carrito."});
    }
}





export const deleteCartId = async (req, res) => {
    const cartId = req.params.cid 
    req.logger = devLogger;
    if (!cartId) {
        return res.status(400).send({ message: "El parámetro cid es inválido" });
      }
    

    try {
        let result = await cartService.deleteAll(cartId);
        res.status(201).send("productos eliminados correctamente");
        
        req.logger.info('exito en deleteCartId');

    } catch (error) {
        req.logger.error('Esto es un error en deleteCartId');
        res.status(500).send({error:  error, message: "No se pudieron eliminar los productos."});
    }
}





export const putCart = async (req, res) => {
    const cartId = req.params.cid;
    const updateProducts = req.body;
    req.logger = devLogger;
    if (!cartId || !updateProducts) {
        return res.status(400).send({ message: "El parámetro cid es inválido" });
      }
    
    try {
        let result = await cartService.putCart(cartId, updateProducts);
        res.status(201).send("carrito actualizado con exito");
        req.logger.info('exito en putCart');

    } catch (error) {
        req.logger.error('Esto es un error en deleteCartId');
        res.status(500).send({error:  error, message: "No se pudo actualizar el carrito."});
    }
}





export const putCartPid = async (req, res) => {
   const cartId = req.params.cid;
    const productId = req.params.pid;
    const {quantity} = req.body;
    req.logger = devLogger;

    if (!cartId|| !productId ||!quantity) {
        return res.status(400).send({ message: "El parámetro cid es inválido" });
      }
    

    try {
        let result = await cartService.updateQuantity(cartId,productId,quantity);
        res.status(201).send("cantidad actulizada con exito");
        req.logger.info('exito en putCartPid');
    } catch (error) {
        req.logger.error('Esto es un error en putCartPid');
        res.status(500).send({error:  error, message: "No se pudo guardar el carrito."});
    }
}




