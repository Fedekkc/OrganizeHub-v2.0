import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';
import { Organization } from './organization.entity';
import { Workday } from './workday.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    projectId: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => User, user => user.projects)
    @JoinTable()
    users: User[];

    @ManyToOne(() => Organization, organization => organization.projects)
    organization: Organization;

    @OneToMany(() => Task, task => task.project)
    tasks: Task[];

    @ManyToOne(() => Workday, workday => workday.projects)
    workday: Workday;
}