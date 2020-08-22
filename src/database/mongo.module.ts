import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/pruebas-nest',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
               
            }),    ]
})
export class MongoModule { }
