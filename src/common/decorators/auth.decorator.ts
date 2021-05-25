import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';





export function  AuthDecorator(){

    return applyDecorators(
        UseGuards(JwtAuthGuard),
        
    )


    // el ApiBearerAuth es un decorador de Sawger
    // y el UseGaurd es un decorador simple
}