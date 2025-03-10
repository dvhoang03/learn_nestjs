import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService){};

    @Get()
    getAll() :string {
        return this.usersService.getAll();
    }
    @Get(':id')
    getDetail(@Param('id',ParseIntPipe) id: number| undefined ): string{
        return `user is ${id}`
    }
    

}