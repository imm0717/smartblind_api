import Product from "src/_domain/product/Product";
import Result from "../Result";
import GetProductsInvalidRequestDTO from "./errors/GetProductsInvalidRequestDTO";

type GetProductsResponseDTO = Result<Product[], GetProductsInvalidRequestDTO>;

export default GetProductsResponseDTO;