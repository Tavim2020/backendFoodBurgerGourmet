import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './image';


@Entity('listBurger')
export default class listBurger {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    type: string;

    @Column()
    ingredient: string;

    @Column()
    avaliation: number;

    @OneToMany(() => Image, image => image.listburger, {
        cascade: ["insert", "update"]
    })
    @JoinColumn({name: "burger_id"})
    images: Image[]
}