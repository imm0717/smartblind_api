import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 100, unique: true})
    email: string;

    @Column({ length: 250 })
    password: string

    @Column({ length: 100, nullable: true})
    firstname: string

    @Column({ length: 100, nullable: true})
    lastname: string

    @Column({ type: 'date', nullable: true})
    date_of_birth: string

    @Column({ length: 50, nullable: true})
    phone: string

    @Column({ type: 'boolean', default: true })
    active: boolean

    @CreateDateColumn()
    created_at
    @UpdateDateColumn()
    updated_at
    

}
