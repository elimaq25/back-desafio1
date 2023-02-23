class Products {

    constructor(title,description,thumbail, code, stock){
        this.title = title;
        this.description = description;
        this.thumbail = thumbail;
        this.code = code;
        this.stock = stock
    }

    getProducts(){
        return this;
    }
}

export { Products };