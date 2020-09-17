import { profile } from 'console';
import { type } from 'src/configs/ormconfig';
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class Gender {

    @PrimaryGeneratedColumn()
    id:number

    @Column({ length: 50, nullable: false})
    gender: string

    @Column({ default: true})
    active: boolean

    @CreateDateColumn()
    created_at
    
    @UpdateDateColumn()
    updated_at

    @OneToMany( type => Profile, profile => profile.id, {
        cascade: true
    })
    profiles: Profile[]
}
