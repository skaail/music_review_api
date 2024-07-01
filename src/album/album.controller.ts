import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
    constructor(private service: AlbumService) { }

    @Post()
    create(@Body() album: CreateAlbumDto): Promise<CreateAlbumDto> {
        return this.service.create(album)
    }

    @Get()
    findAll() {
        return this.service.findAll()
    }

}
