import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { Reserva } from '@prisma/client';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  create(@Body() createReservaDto: CreateReservaDto): Promise<Reserva> {
    return this.reservasService.create(createReservaDto);
  }

  @Get()
  findAll(): Promise<Reserva[]> {
    return this.reservasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reserva | null> {
    return this.reservasService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Reserva> {
    return this.reservasService.remove(id);
  }
}
