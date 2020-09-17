import { User } from './User';
import {Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Gender } from "./Gender";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 100, nullable: true})
    firstname: string

    @Column({ length: 100, nullable: true})
    lastname: string

    @Column({ type: 'date', nullable: true})
    date_of_birth: string

    @Column({ length: 50, nullable: true})
    phone: string

    @Column({ length: 100, nullable: true})
    photo: string

    @OneToOne(type => User, user => user.id)
    user: User

    @ManyToOne(type => Gender, gender => gender.id)
    gender: Gender

    @CreateDateColumn()
    created_at
    @UpdateDateColumn()
    updated_at

    

}
