import { Album } from "src/album/entities/album.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('banda')
export class Banda {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    nome: string

    @OneToMany(() => Album, (album) => album.banda)
    albuns: Album[]

}