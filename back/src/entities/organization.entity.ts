import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Team } from './team.entity';
import { Project } from './project.entity';
@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    organizationId: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 255, nullable: true })
    description: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 15, nullable: true })
    phone: string;

    @Column({ length: 255, nullable: true })
    address: string;

    @OneToMany(() => Team, team => team.organization) 
    teams: Team[];

    @OneToMany(() => Project , project => project.organization)
    projects: Project[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}