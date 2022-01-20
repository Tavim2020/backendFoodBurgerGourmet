import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import listBurger from './listBurger';


@Entity('imagesBurger')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;   

    @ManyToOne(()=> listBurger, listBurger => listBurger.images)
    @JoinColumn({ name: 'burger_id'})
    listburger: listBurger
}