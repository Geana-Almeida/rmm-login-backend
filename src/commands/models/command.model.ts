import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Commands{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    machineIp: string;
    @Column()
    action: string;
    @Column('json')
    params: any;
    @Column({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
    @Column()
    status: string;
}