import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateProductPayload, ProductFilter, ProductRepository } from 'src/_application/_repository';
import { Repository } from 'typeorm';
import { Product } from './../_entities';


@Injectable()
export default class TypeOrmProductRepository implements ProductRepository {

    constructor(@InjectRepository(Product) private readonly productTypeOrmRepository: Repository<Product>) {

    }

    async getProduct(id: number): Promise<Product> {
        return await this.productTypeOrmRepository.findOne(id);
    }

    async createProduct(payload: CreateProductPayload): Promise<Product> {
        const newProduct = this.productTypeOrmRepository.create(payload)
        return await this.productTypeOrmRepository.save(newProduct);
    }

    async updateProduct(product: Product): Promise<Product> {
        const productInDb = this.productTypeOrmRepository.findOne({ id: product.id })

        if (productInDb) {
            const updatedProduct = { ...productInDb, ...product }
            return await this.productTypeOrmRepository.save(updatedProduct);
        }

        throw new Error('Product do not exist');
    }

    getProducts(filter?: ProductFilter): Promise<Product[]> {
        return this.productTypeOrmRepository.find(filter);
    }

}