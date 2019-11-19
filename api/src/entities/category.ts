import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from "typeorm";
import { IsString, MinLength, MaxLength } from "class-validator";
import { Joke } from "./joke";

@Entity()
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString({ message: "The title has to be a string" })
    @MinLength(3, { message: "The title is too short (min 3)" })
    @MaxLength(32, { message: "The title is too long (max 32)" })
    title: string;
    
    @ManyToMany(type => Joke, joke => joke.categories)
    jokes: Joke[];
    
    @CreateDateColumn()
    createdAt: string;
    
    @UpdateDateColumn()
    updatedAt: number;
}