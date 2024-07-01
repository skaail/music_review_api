import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { BandaService } from 'src/banda/banda.service';
const albumArt = require('album-art');

@Injectable()
export class AlbumService {
    constructor(@InjectRepository(Album) private repository: Repository<Album>, private readonly bandaService: BandaService) { }

    async create(album: CreateAlbumDto): Promise<any> {
        let albumEntity = new Album()
        let banda = await this.bandaService.findByName(album.banda)

        if(!banda) {
            banda = await this.bandaService.create({nome: album.banda})
        }

        albumEntity.nome = album.nome
        albumEntity.banda = banda
        albumEntity.nota = 0

        albumEntity.capa = await this.getAlbumArt(album.nome, album.banda)
        albumEntity.link = await this.getAlbumUri(album.nome, album.banda)

        if(await this.repository.findOne({where: {nome: albumEntity.nome}})){
            throw new HttpException('Este Album Já Foi Criado', HttpStatus.CONFLICT)
        }

        albumEntity = await this.repository.save(albumEntity)

        return albumEntity
    }

    async findAll(): Promise<any> {
        const albums = await this.repository.find({ relations: {banda: true}})

        return albums
    }

    async getAlbumArt(album, banda): Promise<string> {
        return await albumArt(banda, {album: album})
    }

    async getSpotifyAuthToken(clientId, clientSecret) {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
          },
          body: 'grant_type=client_credentials'
        });
      
        const data = await response.json();
        return data.access_token;
    }

    async getAlbumUri(album, banda) {
        const token = await this.getSpotifyAuthToken("47d629387eff4cc2a731e7f2c290302e", "5bcf17b2ac36460480687f83171004ae")

        const response = await fetch(`https://api.spotify.com/v1/search?q=album%253A${album}%252520artist%253A${banda}&type=album&limit=1`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        )

        const data = await response.json()

        return data.albums.items[0].uri
    }
}
