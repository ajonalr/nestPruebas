import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { IAuthUser, IUser } from './users.interface';
import { UserDTO } from './userDto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {

    private user: IUser[] = [];// array privisional de usuarios

    constructor(@InjectModel('Users') private readonly userModel: Model<IAuthUser>,
        private jwtService: JwtService) { }


    // para logearce
    async login(username: string, password: string): Promise<IUser> {
        let userObj: IUser;
        const userFind = await this.userModel.findOne({ username: username });

        if (userFind) {
            if (bcrypt.compareSync(password, userFind.password)) {
                userObj = { username, password: userFind.password };
                console.log(this.user);
                return userObj;
            }
        }
    }


    async create(user: UserDTO): Promise<{}> {
        const newuser = user;
        newuser.password = await bcrypt.hashSync(newuser.password, 10);
        const usernew = await new this.userModel(newuser).save();
        return usernew;
    }


    


}