import { Module } from '@nestjs/common';
import { LocacoesService } from './locacoes.service';
import { LocacoesController } from './locacoes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LocacoesService],
  controllers: [LocacoesController],
})
export class LocacoesModule {}
