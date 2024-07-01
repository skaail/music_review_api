import { Module } from '@nestjs/common';
import { BandaService } from './banda.service';
import { BandaController } from './banda.controller';

@Module({
  providers: [BandaService],
  controllers: [BandaController]
})
export class BandaModule {}
