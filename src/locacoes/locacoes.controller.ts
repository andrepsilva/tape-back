import { Controller, Get, Post, Patch, Body, Param, Delete } from '@nestjs/common';
import { LocacoesService } from './locacoes.service';
import { CreateLocacaoDto } from './dto/create-locacao.dto';
import { Locacao } from '@prisma/client';

@Controller('locacoes')
export class LocacoesController {
  constructor(private readonly locacoesService: LocacoesService) {}

  @Post()
  create(@Body() createLocacaoDto: CreateLocacaoDto): Promise<Locacao> {
    return this.locacoesService.create(createLocacaoDto);
  }

  @Get()
  findAll(): Promise<Locacao[]> {
    return this.locacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Locacao | null> {
    return this.locacoesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Locacao> {
    return this.locacoesService.remove(id);
  }

  @Patch('confirmar/:reserva_id/:cliente_id')
  confirmarLocacao(@Param('reserva_id') reserva_id: string, @Param('cliente_id') cliente_id: string): Promise<Locacao> {
    return this.locacoesService.confirmarLocacao(reserva_id, cliente_id);
  }

  @Patch('devolver/:id')
  devolverFilme(@Param('id') id: string): Promise<Locacao> {
    return this.locacoesService.devolverFilme(id);
  }
}
