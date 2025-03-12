import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product) 
        private productRepository: Repository<Product[]>
    ){};

    async getAll(): Promise<Product[]>{
        return await this.productRepository.query(`
            SELECT * FROM product
            `)
    };

    async getDetail( id : number): Promise<Product>{
        return this.productRepository.query(`
            SELECT * FROM product WHERE id = ${id}`);
    };

    async createProduct(product: Partial<Product>) {
        this.productRepository.query(
                `INSERT INTO product (name, description, price, stock)
                VALUES ('${product.name}', '${product.description}',${product.price},${product.stock})
                `
        )
    };

    async updateProduct(id: number, product: Partial<Product>) {
        this.productRepository.query(
            `UPDATE product
            SET name ='${product.name}', price =${product.price}, stock = ${product.stock}
            WHERE id = ${id}
            `
        )
    }

    async deleteProduct( id :number){
        this.productRepository.query(`
            DELETE FROM product WHERE id =${id}
            `);
    }
      

}

