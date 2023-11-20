
import { generateProduct } from "../services/dao/mock-products/products.js";

export const getProductsLimit10 = async (req, res) => {
    const limit = req.query.limit || 100;
    
    try {
        let products = generateProduct(limit);
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "No se pudo obtener los productos."});
    }
}

