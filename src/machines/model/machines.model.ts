import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Machines{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    ipAddress: string;
}