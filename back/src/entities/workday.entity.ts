import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class Workday {
    @PrimaryGeneratedColumn()
    workdayId: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];


    @OneToMany(() => Project, project => project.workday)
    projects: Project[];
}