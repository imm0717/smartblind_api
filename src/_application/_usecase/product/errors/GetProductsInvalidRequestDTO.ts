import UseCaseError from "../../UseCaseError";
import GetProductsRequestDTO from "../GetProductsRequestDTO";

export default class GetProductsInvalidRequestDTO extends UseCaseError {

    constructor(payload: GetProductsRequestDTO){
        super(`Request ${JSON.stringify(payload)} is not valid.`);
    }

}