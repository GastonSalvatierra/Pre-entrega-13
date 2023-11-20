import productService from '../services/dao/db/products.services.js';
import ProductsDto from '../services/dto/products.dto.js';
import EErrors from '../services/error/errors-enum.js';
import CustomError from '../services/error/CustomError.js';
import { generateProductErrorInfo } from '../services/error/messages/products-creation-error.message.js';
import { devLogger } from '../config/logger_BASE.js';

const productServices = new productService();



//PETICIONES GET 

export const getProductsLimit = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        let products;
        req.logger = devLogger;
    
        if (req.query.filter === 'vehiculo') {
          products = await productServices.getProducts("vehiculo");
        } else if (req.query.sort === '') {
          products = await productServices.getPrices();
        } else {
          products = await productServices.getLimit(limit);
        }

        req.logger.info('exito en getProductsLimit');
        res.status(201).send(products);
      } catch (error) {
        req.logger.error('Esto es un error en getProductsLimit');
        res.status(500).send({ message: "No se pudieron obtener los productos." });
      }
}




export const getProductsPage = async (req, res) => {
    try {
        let page = parseInt(req.params.page);
        let user = await productServices.getName(req.session.user.email);
        req.logger = devLogger;

        
        req.logger.info(user);
        
        let products = await productServices.getPage(page);
        
        if (req.session.user.role !== 'admin') {
          res.render('products', {
            isValid: true,
            user: user.first_name,
            email: user.email,
            docs: products.docs,
            hasPrevPage: products.hasPrevPage,
            prevLink: `/api/products/pages/${products.prevPage}`,
            page: products.page,
            hasNextPage: products.hasNextPage,
            nextLink: `/api/products/pages/${products.nextPage}`
          });
        }else{
          res.render('admin');
        } 
        
      } catch (error) {
        req.logger.error('Esto es un error en getProductsPage');
        res.status(500).send({message: "No se pudieron obtener los productos."});
      }
}


//PETICIONES POST

export const postProducts = async (req, res) => {
    // Aquí deberías destruir la sesión del usuario
    req.session.destroy((err) => {
        if (err) {
          console.error('Error al cerrar sesión:', err);
        } else {
          // Redirige al usuario a la página de inicio de sesión después de destruir la sesión
          res.redirect('/');
        }
      });
}



//CORRESPONDE A LA ENTREGA ANTERIOR


export const getProductsLimit10 = async (req, res) => {
    const limit = req.query.limit || 10;
    try {
        let carts = await productServices.getAll(limit);
        req.logger = devLogger;
        req.logger.info('exito en getProductsLimit10');
        res.send(carts);
    } catch (error) {
      req.logger.warning('Esto es un error en getProductsLimit10');
        res.status(500).send({message: "No se pudo obtener los estudiantes."});
    }
}




export const postProductsSave = async (req, res) => {

  const {title,description,code,price,status,stock,category,thumbnail} = req.body
  if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
    
      CustomError.createError({
      name: "Post Product Error",
      cause: generateProductErrorInfo(JSON.stringify(req.body)),
      message: "Error tratando de crear un producto",
      code: EErrors.INVALID_TYPES_ERROR
    });
    
  }

  const productDto = new ProductsDto(req.body)

    try {
        let result = await productServices.save(productDto);
        res.status(201).send(result);
        req.logger.info('exito en postProductsSave');
    } catch (error) {
        res.status(500).send({message: "No se pudo guardar el producto, complete todos los campos."});
    }
}




export const putProducts = async (req, res) => {
  const productIdToUpdate = req.params.pid;
  const updateFields = req.body;

  try {
      const updatedProduct = await productServices.updateById(productIdToUpdate, updateFields);
      req.logger = devLogger;
      req.logger.info('exito en putProducts');
      res.send(updatedProduct);
  } catch (error) {
      req.logger.warning('Esto es un error en putProducts');
      res.status(500).send({ message: "No se pudo actualizar el producto." });
  }
}



export const deleteProducts = async (req, res) => {
    const deleteProductId = req.params.pid;

    try {
        const updatedProduct = await productServices.deleteById(deleteProductId);
        req.logger = devLogger;
        req.logger.info('exito en deleteProducts');
        res.send(updatedProduct);
    } catch (error) {
        req.logger.warning('Esto es un error en deleteProducts');
        res.status(500).send({ message: "No se pudo actualizar el producto." });
    }
}
