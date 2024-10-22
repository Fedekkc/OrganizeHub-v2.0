import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Organization } from './organization.entity';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    permissionId?: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    category: string;



    @ManyToMany(() => Role, role => role.permissions)
    @JoinTable()
    roles?: Role[];
}