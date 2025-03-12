import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string

    @Column('decimal')
    price: number;

    @Column()
    stock: number;

    @CreateDateColumn()
    createAt: Date;

    @CreateDateColumn()
    updateAt: Date;

}