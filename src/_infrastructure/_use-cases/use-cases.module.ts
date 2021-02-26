/* eslint-disable @typescript-eslint/no-inferrable-types */
import { DynamicModule, Module } from '@nestjs/common';
import { GetProducts } from 'src/_application/_usecase';
import { RepositoryModule, TypeOrmProductRepository } from '../_repositories';
import { UseCaseProxy } from './use-case-proxy';

@Module({
    imports:[RepositoryModule]
})
export class UseCasesModule {
    static GET_PRODUCTS: string = 'GetProducts';

    static register(): DynamicModule{
        return {
            module: UseCasesModule,
            providers: [{
                inject:[TypeOrmProductRepository],
                provide: UseCasesModule.GET_PRODUCTS,
                useFactory: (typeOrmProductRepository: TypeOrmProductRepository) => new UseCaseProxy(new GetProducts(typeOrmProductRepository)) 
            }],
            exports: [UseCasesModule.GET_PRODUCTS]
        }
    }

}
