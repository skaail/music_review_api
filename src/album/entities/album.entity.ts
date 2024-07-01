import { Banda } from "src/banda/entities/banda.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('album')
export class Album {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    nome: string

    @ManyToOne(() => Banda, (banda) => banda.albuns)
    banda: Banda

    @Column()
    capa: string

    @Column()
    link: string

    @Column()
    nota?: number | undefined

}