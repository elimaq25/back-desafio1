import { Products } from "./products.js";
 const fs = require('fs');

class ProductsManager {
    constructor() {
        this.products = []
    }

    increaseId = () => {
        const count = this.products.length;
        const idIcrease = (count > 0) ? this.products[count - 1].id + 1 : 1;
        return idIcrease;
    }

    addProduct(product) {
        if (!this.products.find((pro) => pro.code === product.code)) {
            product['id'] = this.increaseId();
            this.products.push(product);
        }
    }

    getProducts() {
        // this.products.forEach((pro) => {
        //     console.log(pro.getProductsJson());
        // });
        return this.products;
    }

    getProductById(id) {
        if (this.products.find((pro) => pro.id === id)) {
            return this.products.find((pro) => pro.id === id);
        } else {
            return 'Not found';
        }
    }
}

const product0 = new Products('Tenis blanco', 'Tenis blanco', 'https://cf.shopee.com.mx/file/86abe40655e69f234573094d1fb2a268', '0', '3200');

const product1 = new Products ('Tenis rojo','Tenis rojo','https://cdn.shopify.com/s/files/1/0275/5752/7616/products/1383266_2_2b6d7944-b73f-482e-92fa-89cc88bb62a0_1024x.jpg?v=1593482442', '1', '5000' );

const product2 = new Products ('Tenis negro','Tenis negro', 'https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/mg/gm/3pp/asr/78bf12f2-a697-40dd-acbc-a07b24b32e79.c48b6bc31501cf4d5382b033efcaa846.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff', '2', '6000');

const product3 = new Products ('Tenis azul', 'Tenis azul' ,'https://cdn.shopify.com/s/files/1/0275/5752/7616/products/1590152_2_1024x.jpg?v=1616452260', '4', '7000' );

const productManager = new ProductsManager();

productManager.addProduct(product0);
productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(3));