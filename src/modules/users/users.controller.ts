import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { UserDTO } from "./dto/userDTO.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { };

    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.getAll();
    }
    @Get(':id')
    getDetail(@Param('id') id: string ): Promise<User> {
        return this.usersService.getDetail(id);
    }

    @Post()
    createUser(@Body() userDTO:  UserDTO) {
        console.log( userDTO)
        this.usersService.createUser(userDTO);
    }

    @Put(':id')
    updateUser(@Param('id') id: string,@Body() userDTO: UserDTO){
        this.usersService.update(userDTO,id);

    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): void{
        this.usersService.deleteUser(id);
    }


}