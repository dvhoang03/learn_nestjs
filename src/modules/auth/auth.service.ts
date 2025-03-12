import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor( 
        private readonly userService: UsersService,
        private jwtService: JwtService
    ){};

    async signIn( username: string, pass: string)
        : Promise<{access_token: string}>
    {
        const userArray = await this.userService.findOne(username);
        
        if( !userArray || userArray[0].password !== pass){
            throw new UnauthorizedException();
        }
        const user = userArray[0]; 
        const payload ={ sub: user.id, username: user.name};

        const access_token ={
            access_token: await this.jwtService.signAsync(payload),
        }
        console.log("token",access_token);
        return access_token ;
    }
}
