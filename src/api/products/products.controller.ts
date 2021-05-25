import { Controller, Get, Res, HttpStatus, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Response, Request } from 'express';
import { ProductsService } from './products.service';
import { ProductsDTO } from './products.dto';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) { }

    @AuthDecorator()
    @Get()
    async getProducts(@Res() res: Response) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json(products);
    }

    @Get(':id')
    async getProduct(@Res() res: Response, @Param('id') id: string) {
        const product = await this.productService.getProduct(id);
        return {
            message: `Dato Encontado: ${product.title}`,
            product
        }
    }

    @Post()
    async store(@Body() productDto: ProductsDTO, @Res() res: Response) {
        const product = await this.productService.saveProduct(productDto);
        return res.status(HttpStatus.CREATED).json(product);
    }

    @Put(':id')
    async update(@Body() productDto: ProductsDTO, @Param('id') id: string, @Res() res: Response) {
        const product = this.productService.updateProduct(id, productDto);
        return res.status(HttpStatus.OK).json({ product, messge: 'actualizado con exito' });
    }

    @Delete(':id')
    async delete(@Res() res: Response, @Param('id') id: string) {
        const product = await this.productService.getProduct(id);
        return res.status(HttpStatus.OK).json(product);
    }


}
