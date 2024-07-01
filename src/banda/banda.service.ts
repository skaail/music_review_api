import { Injectable } from '@nestjs/common';
import { Banda } from './entities/banda.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBandaDto } from './dto/create-banda.dto';

@Injectable()
export class BandaService {

    constructor(@InjectRepository(Banda) private repository: Repository<Banda>) { }

    async create(banda: CreateBandaDto): Promise<Banda> {
        let bandaEntity = new Banda()

        bandaEntity.nome = banda.nome

        bandaEntity = await this.repository.save(bandaEntity)

        return bandaEntity
    }

    async findAll(): Promise<CreateBandaDto[]> {
        const bandas = await this.repository.find({ relations: {albuns: true}})

        return bandas
    }

    async findByName(nome: string) {
        const banda =  await this.repository.findOne({ where: {nome: nome}})

        return banda
    }
}
