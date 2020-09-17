import { User } from './User';
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    user: User

    @Column({ length: 100, nullable: true })
    fullname: string

    @Column({ length: 150, nullable: true })
    address1: string

    @Column({ length: 150, nullable: true })
    address2: string

    @Column({ length: 5, nullable: true })
    postcode: string

    @Column({ length: 100, nullable: true })
    city: string

    @Column({ length: 30, nullable: true })
    phone: string

    @CreateDateColumn()
    created_at
    @UpdateDateColumn()
    updated_at

}
