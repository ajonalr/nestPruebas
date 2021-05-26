import { IUser } from './users.interface';
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('user')
export class UserController {

   constructor(
      private _userService: UsersService
   ) { }

   @Post('create')
   async storeUser(@Body() body: IUser) {
      
      const user = await this._userService.create(body);
      
      return {
         message: ` Creado Con Exito`,
         user
      }

   }
}
