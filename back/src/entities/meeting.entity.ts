import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Meeting {
    @PrimaryGeneratedColumn()
    meetingId: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @ManyToMany(() => User, user => user.meetings)
    assignedTo: User[];

    @ManyToOne(() => User, user => user.createdMeetings)
    createdBy: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

}