import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany, Or, OneToOne, JoinColumn } from 'typeorm';
import { Team } from './team.entity';
import { Task } from './task.entity';
import { Project } from './project.entity';
import { Meeting } from './meeting.entity';
import { Organization } from './organization.entity';
import { IsOptional } from 'class-validator';

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

    @ManyToOne(() => Organization, organization => organization.users)
    @JoinColumn()
    organization: Organization;

    @OneToMany(() => Task, task => task.assignedTo)
    tasks: Task[];

    @OneToMany(() => Task, task => task.createdBy)
    createdTasks: Task[];

    @OneToOne(() => Organization, organization => organization.owner)
    ownedOrganization: Organization;

    @ManyToMany(() => Project, project => project.users)
    projects: Project[];

    @ManyToMany(() => Team, team => team.users)
    teams: Team[];

    @ManyToMany(() => Meeting, meeting => meeting.assignedTo)
    meetings: Meeting[];

    @OneToMany(() => Meeting, meeting => meeting.createdBy)
    createdMeetings: Meeting[];

}