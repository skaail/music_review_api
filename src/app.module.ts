import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module';
import { BandaModule } from './banda/banda.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'silly.db.elephantsql.com',
    port: 5432,
    username: 'mobyrglv',
    password: 'npuH3h5B0s2Cjm3QPrin-LqNvu7wJK1Y',
    database: 'mobyrglv',
    entities: ['**/entity/*.entity.ts'],
    synchronize: true,
    autoLoadEntities: true
  }), AlbumModule, BandaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
