import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GenerosService } from './generos.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { Genero } from '@prisma/client';

@Controller('generos')
export class GenerosController {
  constructor(private readonly generosService: GenerosService) {}

  @Post()
  create(@Body() createGeneroDto: CreateGeneroDto): Promise<Genero> {
    return this.generosService.create(createGeneroDto);
  }

  @Get()
  findAll(): Promise<Genero[]> {
    return this.generosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Genero> {
    return this.generosService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Genero> {
    return this.generosService.remove(id);
  }
}
