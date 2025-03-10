import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserDTO } from "./dto/userDTO.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }



    async getAll(): Promise<User[]> {
        return await this.userRepository.query(`SELECT * FROM user`);
    }

    async getDetail(id: string): Promise<User> {
        return await this.userRepository.query(`
            SELECT * FROM user WHERE id = ${Number(id)}
            `);
    }

    async createUser(userDTO: UserDTO): Promise<void> {
        this.userRepository.query(`Insert into user values 
            ('${userDTO.id}','${userDTO.name}','${userDTO.mail}','${userDTO.phone}','${userDTO.password}','${userDTO.id}' ) `)
    }

    async update(userDTO: UserDTO, id: string): Promise<void> {
        this.userRepository.query(`
            UPDATE user SET 
            id = ${userDTO.id},
            name= '${userDTO.name}',
            email= '${userDTO.mail}',
            phone=' ${userDTO.phone}',
            password= '${userDTO.password}',
            isActive= ${userDTO.isActive}
            WHERE id = ${Number(id)}
            `)
    }

    async deleteUser(id: string): Promise<void> {
        this.userRepository.query(`
            DELETE FROM user WHERE id = ${Number(id)}
            `);
    }
}