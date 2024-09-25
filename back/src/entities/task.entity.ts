import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    taskId: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @ManyToOne(() => User, user => user.tasks)
    assignedTo: User;

    @ManyToOne(() => Project, project => project.tasks)
    project: Project;

    @ManyToOne(() => User, user => user.createdTasks)
    createdBy: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;
}