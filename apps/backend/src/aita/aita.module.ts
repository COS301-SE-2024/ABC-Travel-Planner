import { Module } from '@nestjs/common';
import { AitaService } from './aita.service';
import { AitaController } from './aita.controller';

@Module({
  imports: [],
  controllers: [AitaController],
  providers: [AitaService],
})
export class AitaModule {}
