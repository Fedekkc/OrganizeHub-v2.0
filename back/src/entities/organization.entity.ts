import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Team } from './team.entity';
import { Project } from './project.entity';
import { User } from './user.entity';
import { Role } from './role.entity';
import { Invitation } from './invitation.entity';
@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    organizationId: number;

    @Column({ length: 100 })
    name: string;

    
    @OneToOne(() => User, user => user.ownedOrganization)
    @JoinColumn()
    owner: User;

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

    @OneToMany(() => Role, role => role.organization)
    roles?: Role[];

    @OneToMany(() => User, user => user.organization)
    users: User[];

    @OneToMany(() => Invitation, invitation => invitation.organization)
    invitations?: Invitation[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

}