import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';

@Controller('product')
export class ProductController {

    constructor( private readonly productService: ProductService){};

    @Get()
    getAll(): Promise<Product[]>{
        return this.productService.getAll();
    }

    @Get(':id')
    getDetail(@Param('id') id: string): Promise<Product>{
        return this.productService.getDetail(Number(id));
    }

    @Post()
    createProduct(@Body() productDto: ProductDTO){
        this.productService.createProduct(productDto);
    }

    @Put(':id')
    updateProduct(@Body() productDto: ProductDTO, @Param('id') id: string){
        this.productService.updateProduct(Number(id), productDto);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string){
        this.productService.deleteProduct(Number(id));
    }


}
