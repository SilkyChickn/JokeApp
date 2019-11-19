import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsString, MaxLength, MinLength } from "class-validator";

@Entity()
export class Author {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    @IsString({ message: "The name has to be a string" })
    @MinLength(3, { message: "The name is too short (min 3)" })
    @MaxLength(32, { message: "The name is too long (max 32)" })
    name: string;
    
    @Column({ type: 'text' })
    @MaxLength(256, { message: "The signature is too long (max 256)" })
    signature: string;
    
    @CreateDateColumn()
    createdAt: string;
    
    @UpdateDateColumn()
    updatedAt: number;
}