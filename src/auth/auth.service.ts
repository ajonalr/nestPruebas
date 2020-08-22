import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from './users/users.interface';
import { UserDTO } from './users/userDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {

    const user: any = await this.usersService.login(username, pass);
    if (user) {
      // elimina el arreglo de los usuarios
      const { password, ...result } = user;
      
      return result;
    }
    return null;
  }

  async login(user: any) {

    // console.log(user);
    

    const payload = { username: user.username, sub: user.userId };

    return {
      message: 'login is Success',
      user,
      access_token: this.jwtService.sign(payload),
    };
  }


  async register(user: UserDTO) {
     
    return await this.usersService.store(user);

  }
}