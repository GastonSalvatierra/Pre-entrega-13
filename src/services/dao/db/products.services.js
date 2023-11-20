import productsModel from "../db/models/products.js";
import userModel from "../db/models/user.js";

import EErrors from "../../error/errors-enum.js";
import CustomError from "../../error/CustomError.js";
import { generateProductErrorInfo } from "../../error/messages/products-creation-error.message.js";

export default class productService{

    getName = async (mail) => {
        let user = await userModel.findOne({ email:mail });
        return user;
    }

    getLimit = async (limit) => {
        if (!limit) limit = 10;
        let products = await productsModel.paginate({}, {limit:limit, page:1});
        return products;
    }


    getPage = async (page) => {

        if (!page) page = 1;

        let result = await productsModel.paginate({}, { page, limit: 2, lean: true })

        result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products/pages/${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products/pages/${result.nextPage}` : '';
        result.isValid = !(page <= 0 || page > result.totalPages)

        return result;
    }



    getProducts = async (filtro) => {

        if (filtro) {

            let products = await productsModel.aggregate([
                {
                    $match: {category:filtro}
                }
            ]);
            return products;
        }else{
            let products = await productsModel.find();
            return products.map(product =>product.toObject());
        }

    }



    getPrices = async () => {
        let products = await productsModel.aggregate([
            {
                $sort: {price: -1 }
            }
        ]);
        return products;
    }









    //CORRESPONDE A LA ENTREGA ANTERIOR


    getAll = async (limit) => {
        let products = await productsModel.find().limit(limit);
        return products.map(product =>product.toObject());
    }
    
    save = async (product) => {
        
        let result = await productsModel.create(product);
        return result;
    }

    updateById = async (productId, updateFields) => {
        try {
            const filter = { _id: productId }
            const updatedProduct = await productsModel.updateOne(
                filter, { $set: updateFields });

            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    deleteById = async (productId) => {
        try {
            const filter = { _id: productId };
            const deleteProduct = await productsModel.deleteOne(
                filter);

            return deleteProduct;
        } catch (error) {
            throw error;
        }
    }


};