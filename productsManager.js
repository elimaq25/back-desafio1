import { Products } from "./products.js";
import fs from 'fs/promises'

class ProductsManager {
    constructor(path) {
        this.id = 0;
        this.path = path
        this.products = []
    }


    async loadProducts(){
        const json = await fs.readFile(this.path, 'utf-8');
       
        if (!json) {
            await this.saveProducts();
        } else {
            const products = JSON.parse(json);
            if (products.length > 0){
                this.products = products;
                this.id = this.products[this.products.length - 1].id; 
            }
        }    
    }


    async saveProducts(){
        const json = JSON.stringify(this.products, null, 2)
        await fs.writeFile(this.path, json)
    }

    async addProduct(title, description, price, thumbail, code, stock){
        
        await this.loadProducts();
       
        if (title && description && price && thumbail && code && stock){
            const existCode = this.products.some(product => product.code === code) 
            if (existCode){
                throw new Error("Code ya existe");
            } else {
                
                this.products.push({ id: ++this.id, title, description, price, thumbail, code, stock});
                await this.saveProducts(); 
            }
        } else {
            throw new Error("Faltan campos");
        }  
    }

    async getProducts(){
        await this.loadProducts();
        console.log(this.products)
    }

    async getProductById(id){
        await this.loadProducts();
        const indexID = this.products.find(product => product.id == id);
        if (indexID){
            console.log("El producto con el id es: ", indexID);
        } else {
            throw new Error("Not Found")
        }
    }

    async updateProduct(id, data){
        await this.loadProducts();
        const indexID = this.products.findIndex(product => product.id === id);
        if (indexID !== -1){
            this.products[indexID] = {
                ...this.products[indexID],
                ...data
            }
            await this.saveProducts();
        } else {
            throw new Error("Not Found")
        }
    }

    async deleteProduct(id){
        await this.loadProducts();
        const existID = this.products.findIndex(product => product.id === id);
        if (existID !== -1){
            this.products.splice(existID, 1)
            await this.saveProducts()
        } else {
            throw new Error("Not Found")
        }
    }
} 

const products = new ProductsManager();


   

// const product0 = new Products('Tenis blanco', 'Tenis blanco', 'https://cf.shopee.com.mx/file/86abe40655e69f234573094d1fb2a268', '0', '3200');

// const product1 = new Products ('Tenis rojo','Tenis rojo','https://cdn.shopify.com/s/files/1/0275/5752/7616/products/1383266_2_2b6d7944-b73f-482e-92fa-89cc88bb62a0_1024x.jpg?v=1593482442', '1', '5000' );

// const product2 = new Products ('Tenis negro','Tenis negro', 'https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/mg/gm/3pp/asr/78bf12f2-a697-40dd-acbc-a07b24b32e79.c48b6bc31501cf4d5382b033efcaa846.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff', '2', '6000');

// const product3 = new Products ('Tenis azul', 'Tenis azul' ,'https://cdn.shopify.com/s/files/1/0275/5752/7616/products/1590152_2_1024x.jpg?v=1616452260', '4', '7000' );

// const productManager = new ProductsManager();

// productManager.addProduct(product0);
// productManager.addProduct(product1);
// productManager.addProduct(product2);
// productManager.addProduct(product3);

// console.log(productManager.getProducts());
// console.log(productManager.getProductById(1));
// console.log(productManager.getProductById(3));