import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBandaDto } from './dto/create-banda.dto';
import { BandaService } from './banda.service';

@Controller('banda')
export class BandaController {
    constructor(private service: BandaService) {}
    
    @Post()
    create(@Body() banda: CreateBandaDto): Promise<CreateBandaDto> {
        return this.service.create(banda)
    }

    @Get()
    findAll() {
        return this.service.findAll()
    }

    @Get(':nome')
    findByNome(@Param('nome') nome: string) {
        return this.service.findByName(nome)
    }

}
