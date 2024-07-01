import { Module } from '@nestjs/common';
import { BandaService } from './banda.service';
import { BandaController } from './banda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banda } from './entities/banda.entity';

@Module({
  providers: [BandaService],
  controllers: [BandaController],
  imports: [TypeOrmModule.forFeature([Banda])]
})
export class BandaModule {}
