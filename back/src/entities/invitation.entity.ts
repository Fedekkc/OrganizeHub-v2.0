import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Organization } from './organization.entity';
import { IsEmail } from 'class-validator';

@Entity()
export class Invitation {
    @PrimaryGeneratedColumn()
    invitationId: number;

    @Column({
        type: 'enum',
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    })
    status: 'pending' | 'accepted' | 'rejected';

    @Column({ unique: true })
    @IsEmail()
    email: string;
    
    @ManyToOne(() => Organization, organization => organization.invitations)
    organization: Organization;

    @Column()
    date: Date;
}
