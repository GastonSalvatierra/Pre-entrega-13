export default class ProductsDto {
    constructor(cart) {
        this.title = cart.title;
        this.description = cart.description;
        this.code = cart.code;
        this.price = cart.price;
        this.status = cart.status;
        this.stock = cart.stock;
        this.category = cart.category;
        this.thumbnail = cart.products;
    }

}