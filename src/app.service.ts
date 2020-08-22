import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola,vamos a hacer un api con auth !';
  }
}
