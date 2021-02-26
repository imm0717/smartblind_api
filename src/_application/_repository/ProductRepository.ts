import Product from "src/_domain/Product";
import ProductStatus from "src/_domain/ProductStatus";

export interface ProductFilter {
    title?: string
}

export interface CreateProductPayload {
    title: string,
    handle: string,
    status: ProductStatus
}

export default interface ProductRepository {

    getProduct(id: number):Promise<Product | undefined>;
    createProduct(payload: CreateProductPayload): Promise<Product>;
    updateProduct(product: Product): Promise<Product>;
    getProducts(filter?: ProductFilter ): Promise<Product[] | undefined> ;

}