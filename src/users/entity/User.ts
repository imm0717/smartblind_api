import { Address } from './Address';
import { Profile } from './Profile';
import { Gender } from './Gender';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { userInfo } from 'os';
import { type } from 'src/configs/ormconfig';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 100, unique: true})
    email: string;

    @Column({ length: 250 })
    password: string

    @Column({ type: 'boolean', default: true })
    active: boolean

    @CreateDateColumn()
    created_at
    @UpdateDateColumn()
    updated_at

    @OneToOne(type => Profile, profile => profile.id, {
        cascade: true
    })
    @JoinColumn()
    profile: Profile

    @OneToMany(type => Address, address => address.user)
    address: Address[]
    

}
