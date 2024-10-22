import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Organization } from './organization.entity';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;



    @ManyToMany(() => Role, role => role.permissions)
    @JoinTable()
    roles: Role[];
}