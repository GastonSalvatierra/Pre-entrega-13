import mongoose from 'mongoose';

const collectionName = 'carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: [
                    {
                       productId:{
                            type:mongoose.Schema.Types.ObjectId,
                            ref: "products"
                       }     
                    }
                ],
                default:[]
            },
            quantity: {
                type: Number
            }
        }

    ]
});

cartSchema.pre('findOne',function () {
    this.populate('products.product.productId')
})


const cartsModel = mongoose.model(collectionName, cartSchema);

export default cartsModel;

