// locacoes.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocacaoDto } from './dto/create-locacao.dto';
import { Locacao, LocacaoStatus } from '@prisma/client';

@Injectable()
export class LocacoesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLocacaoDto: CreateLocacaoDto): Promise<Locacao> {
    try {
      const { reserva_id, cliente_id, status } = createLocacaoDto;
      return await this.prisma.locacao.create({
        data: {
          reserva_id,
          cliente_id,
          status: status as LocacaoStatus, // Cast the status to LocacaoStatus enum
        },
      });
    } catch (error) {
      console.error('Error creating locacao:', error);
      throw new InternalServerErrorException('Erro ao criar locação');
    }
  }

  async findAll(): Promise<Locacao[]> {
    try {
      return await this.prisma.locacao.findMany();
    } catch (error) {
      console.error('Error finding all locacoes:', error);
      throw new InternalServerErrorException('Erro ao buscar locações');
    }
  }

  async findOne(id: string): Promise<Locacao | null> {
    try {
      const locacao = await this.prisma.locacao.findUnique({
        where: { id },
      });
      if (!locacao) {
        throw new NotFoundException(`Locação com ID ${id} não encontrada`);
      }
      return locacao;
    } catch (error) {
      console.error(`Error finding locacao with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao buscar locação');
    }
  }

  async remove(id: string): Promise<Locacao> {
    try {
      const locacao = await this.prisma.locacao.delete({
        where: { id },
      });
      return locacao;
    } catch (error) {
      console.error(`Error removing locacao with ID ${id}:`, error);
      throw new InternalServerErrorException('Erro ao remover locação');
    }
  }

  async confirmarLocacao(reserva_id: string, cliente_id: string): Promise<Locacao> {
    try {
      console.log(`Procurando reserva com ID: ${reserva_id}`);
      const reserva = await this.prisma.reserva.findUnique({
        where: { id: reserva_id },
      });

      if (!reserva) {
        console.log(`Reserva com ID ${reserva_id} não encontrada`);
        throw new NotFoundException(`Reserva com ID ${reserva_id} não encontrada`);
      }

      console.log(`Reserva encontrada: ${JSON.stringify(reserva)}`);

      return await this.prisma.locacao.create({
        data: {
          reserva_id,
          cliente_id,
          status: LocacaoStatus.LEASED, // Use the enum value for status
        },
      });
    } catch (error) {
      console.error(`Error confirming locacao for reserva_id ${reserva_id} and cliente_id ${cliente_id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao confirmar locação');
    }
  }

  async devolverFilme(id: string): Promise<Locacao> {
    try {
      return await this.prisma.locacao.update({
        where: { id },
        data: { status: LocacaoStatus.RETURNED }, // Use the enum value for status
      });
    } catch (error) {
      console.error(`Error returning locacao with ID ${id}:`, error);
      throw new InternalServerErrorException('Erro ao devolver locação');
    }
  }
}
