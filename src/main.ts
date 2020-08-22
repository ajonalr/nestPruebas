import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helemt from 'helmet';
import * as csrurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';

async function bootstrap() {
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
  app.use(compression());

}
bootstrap();
