import { faker } from '@faker-js/faker';

faker.locale = 'es'; // Idioma de los datos

export const generateProduct = (limit) => {
    const products = [];

    for (let i = 0; i < limit; i++) {
        const product = {
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            stock: faker.random.numeric(100), // Establecí un valor máximo de 100 para el stock, puedes ajustarlo según tus necesidades.
            id: faker.database.mongodbObjectId(),
            thumbnail: [faker.image.image(), faker.image.image()],
            description: faker.lorem.sentence(),
            code: faker.datatype.number({ min: 1 , max:1000 }),
            status: faker.datatype.boolean(),
            category: faker.commerce.department()
        };

        products.push(product);
    }

    return products;
};
