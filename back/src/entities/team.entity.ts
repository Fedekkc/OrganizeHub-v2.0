import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Organization } from './organization.entity';
import { User } from './user.entity';

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    teamId: number;

    @Column()
    name: string;

    @ManyToMany(() => Organization, organization => organization.teams)
    organization: Organization;

    @ManyToMany(() => User, user => user.teams)
    users: User[];
}