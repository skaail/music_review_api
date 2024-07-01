import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { BandaModule } from 'src/banda/banda.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), BandaModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [TypeOrmModule]
})
export class AlbumModule {}
