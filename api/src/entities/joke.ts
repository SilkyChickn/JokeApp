import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinTable, ManyToMany } from "typeorm";
import { IsString, IsInt, IsPositive, IsIn, Min, NotContains, MinLength, MaxLength } from 'class-validator';
import { isMainThread } from "worker_threads";
import { Author } from "./author";
import { Category } from "./category";

@Entity()
export class Joke {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    @IsString({ message: "The title has to be a string" })
    @MinLength(3, { message: "The title is too short (min 3)" })
    @MaxLength(128, { message: "The title is too long (max 128)" })
    title: string;

    @Column({ type: 'text' })
    @IsString({ message: "The text has to be a string" })
    @MinLength(3, { message: "The text is too short (min 3)" })
    @MaxLength(1024, { message: "The text is too long (max 1024)" })
    text: string;
    
    @Column({ default: 'visible' })
    @IsIn(["visible", "hidden"], { message: "The visibility has to be visible or hidden" })
    visibility: 'visible' | 'hidden';

    @Column()
    @IsInt({ message: "The funniness has to be an integer" })
    @Min(0, { message: "The funniness is to small (min 0)" })
    funniness: number = 0;
    
    @ManyToOne(type => Author, { eager: true })
    author: Author;

    @ManyToMany(type => Category, category => category.jokes, { eager: true })
    @JoinTable({ name: "joke_categories" })
    categories: Category[];
    
    @CreateDateColumn()
    createdAt: string;
    
    @UpdateDateColumn()
    updatedAt: number;
}