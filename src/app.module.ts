import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { MongoModule } from './database/mongo.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ApiModule,
    MongoModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
     }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
