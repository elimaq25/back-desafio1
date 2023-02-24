class ProductManager {
    constructor(products = []) {
        this.products = products;
        this.id = 0;
    }
    addProduct(title, description, price, thumbail, code, stock){
        if (title && description && price && thumbail && code && stock){
            const existCode = this.products.some(product => product.code === code)
            if (existCode){
                throw new Error("Code ya existe");
            } else {
                this.products.push({ id: ++this.id, title, description, price, thumbail, code, stock});
            }
        } else {
            throw new Error("Faltan campos");
        }  
    }

    getProducts(){
        console.log(this.products)
    }

    getProductById(id){
        const existID = this.products.find(product => product.id === id);
        if (existID){
            console.log("El producto con el id es: ", existID);
        } else {
            throw new Error("Not Found")
        }
    }
} 

const product = new ProductManager()
product.addProduct("Tenis rosas", "Con plataforma", "$2000", "IMG", "4587bt3", "25")
product.getProducts();