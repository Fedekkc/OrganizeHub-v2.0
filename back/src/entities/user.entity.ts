import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Team } from './team.entity';
import { Task } from './task.entity';
import { Project } from './project.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId?: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'user' })
    role: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Task, task => task.assignedTo)
    tasks: Task[];
    

    @OneToMany(() => Task, task => task.createdBy)
    createdTasks: Task[];

    @ManyToMany(() => Project, project => project.users)
    projects: Project[];

    @ManyToMany(() => Team, team => team.users)
    teams: Team[];

}