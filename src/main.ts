import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helemt from 'helmet';
import * as csrurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger();

  const app = await NestFactory.create(AppModule,
    { cors: true }
  );



  await app.listen(process.env.PORT || 3000);
  app.use(helemt());
  app.use(csrurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.useGlobalPipes(new  ValidationPipe({
    whitelist: true
  }) )

  app.use(compression());

  logger.log(`Sever is running in ${await app.getUrl()}`);


}
bootstrap();
