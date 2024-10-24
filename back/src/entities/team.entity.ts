import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { Organization } from './organization.entity';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    teamId?: number;

    @Column()
    name: string;

    @ManyToOne(() => Organization, organization => organization.teams)
    @JoinColumn(
        { name: 'organization' }
    )
    organization: Organization;

    @OneToMany(() => Task, task => task.assignedTeam)
    tasks?: Task[];

    @ManyToMany(() => User, (user) => user.teams)
    @JoinTable()
    users: User[];

}