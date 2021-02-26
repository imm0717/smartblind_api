import { Product } from '../_entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmProductRepository from './TypeOrmProductRepository';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [TypeOrmProductRepository],
    exports: [TypeOrmProductRepository]
})
export class RepositoryModule {}
