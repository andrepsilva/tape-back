import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { Reserva } from '@prisma/client';

@Injectable()
export class ReservasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const { filme_id, cliente_id, expiresAt } = createReservaDto;
    return this.prisma.reserva.create({
      data: {
        filme_id,
        cliente_id,
        expiresAt: new Date(expiresAt),
      },
    });
  }

  async findAll(): Promise<Reserva[]> {
    return this.prisma.reserva.findMany();
  }

  async findOne(id: string): Promise<Reserva | null> {
    return this.prisma.reserva.findUnique({
      where: { id },
    });
  }

  async remove(id: string): Promise<Reserva> {
    return this.prisma.reserva.delete({
      where: { id },
    });
  }
}
