import { Controller, UseGuards, Post, Request, Get, Response, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.auth.guard';
import { JwtAuthGuard } from './guard/jwt.auth.guard';
import { IUser } from './users/users.interface';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req, @Response() res) {
        return res.status(200).json({
            ok: true,
            user: req.user
        });
    }



    @Post('register')
    async storeUser(@Body() body: IUser, @Response() res) {



        const user = await this.authService.register(body);



        if (user) {
            return res.status(200).json({
                ok: true,
                message: 'Register Success',
                user
            });
        } else {
            return res.status(502).json({
                ok: false,
                message: 'Algo Salio mal',
            });
        }


    }





}
