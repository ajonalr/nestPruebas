import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' }
    })
  ],
  providers: [
    UsersService
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
