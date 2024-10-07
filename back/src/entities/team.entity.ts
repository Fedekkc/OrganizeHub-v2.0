import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { Organization } from './organization.entity';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    teamId: number;

    @Column()
    name: string;

    @ManyToMany(() => Organization, organization => organization.teams)
    organization: Organization;

    @OneToMany(() => Task, task => task.assignedTeam)
    tasks: Task[];

    @ManyToMany(() => User, user => user.teams)
    users: User[];
}