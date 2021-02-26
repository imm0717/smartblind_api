import { GetProductsResponseDTO } from 'src/_application/_usecase';
import { GetProductsRequestDTO } from 'src/_application/_usecase';
import { Body, Controller, Inject } from '@nestjs/common';
import { GetProducts } from 'src/_application/_usecase';
import { UseCasesModule, UseCaseProxy } from 'src/_infrastructure/_use-cases';

@Controller('products')
export class ProductsController {
    constructor(@Inject(UseCasesModule.GET_PRODUCTS) private getProducts: UseCaseProxy<GetProducts>  ){

    }

    async getAllProducts(@Body() getProductsDTO: GetProductsRequestDTO): Promise<GetProductsResponseDTO>{
        return await this.getProducts.getInstance().execute(getProductsDTO)
    }
}
