import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Team } from './team.entity';

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

    // limitamos a que solo se pueda establecer high, medium o low.
    // para limitar los valores que se pueden establecer en una columna, podemos usar la propiedad enum de typeORM.
    @Column({ type: 'enum', enum: ['high', 'medium', 'low'] })
    priority: string;

    @Column( { type: 'date' })
    dueDate: Date;
    
    @ManyToOne(() => User, user => user.tasks)
    assignedTo: User;

    @ManyToOne(() => Team, team => team.tasks)
    assignedTeam: Team;

    @ManyToOne(() => Project, project => project.tasks)
    project: Project;

    @ManyToOne(() => User, user => user.createdTasks)
    createdBy: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;
}