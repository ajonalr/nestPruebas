import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProducts } from './products.interface';
import { ProductsDTO } from './products.dto';

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Products') private readonly productsModel: Model<IProducts>) { }

    async getProducts(): Promise<IProducts[]> {
        return await this.productsModel.find();
    }
    async getProduct(id: string): Promise<IProducts> {
        return await this.productsModel.findById(id);
    }

    async saveProduct(product: ProductsDTO): Promise<IProducts> {
        return await new this.productsModel(product).save();
    }

    async updateProduct(id: string, product: ProductsDTO): Promise<IProducts> {
        return await this.productsModel.findByIdAndUpdate(id, product, { new: true });
    }

    async deleteProduct(id: string): Promise<IProducts> {
        return await this.productsModel.findByIdAndDelete(id);
    }

}
