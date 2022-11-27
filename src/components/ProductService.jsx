// Gets the data from the .json file in src/components/products.json file
export class ProductService {

    getProducts() {
        return fetch('./src/components/products.json').then(res => res.json()).then(d => d.data);
    }
}