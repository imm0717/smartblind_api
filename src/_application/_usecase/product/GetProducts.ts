import { ProductRepository } from "src/_application/_repository";
import Product from "src/_domain/Product";
import Result from "../Result";
import UseCase from "../UseCase";
import GetProductsInvalidRequestDTO from "./errors/GetProductsInvalidRequestDTO";
import GetProductsRequestDTO from "./GetProductsRequestDTO";
import GetProductsResponseDTO from "./GetProductsResponseDTO";

export default class GetProducts implements UseCase<GetProductsRequestDTO, GetProductsResponseDTO> {
    private productRepository: ProductRepository

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    public async execute(req: GetProductsRequestDTO): Promise<GetProductsResponseDTO> {

        if (!req || !req.title)
            return Result.fail(new GetProductsInvalidRequestDTO(req))

        const products: Product[] = await this.productRepository.getProducts(req);
        return Result.ok(products)
    }

}