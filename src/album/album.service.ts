import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
    constructor(@InjectRepository(Album) private albumRepository: Repository<Album>) { }
}
