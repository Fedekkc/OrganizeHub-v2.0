import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';
import { Organization } from './organization.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => User, user => user.roles)
    users: User[];

    @ManyToOne(() => Organization, organization => organization.roles)
    organization: Organization;

    @ManyToMany(() => Permission, permission => permission.roles)
    permissions: Permission[];

    

}