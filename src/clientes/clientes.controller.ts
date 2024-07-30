// src/clientes/clientes.controller.ts
import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createClienteDto: CreateClienteDto) {
    try {
      return await this.clientesService.create(createClienteDto);
    } catch (error) {
      throw new HttpException('Erro ao criar cliente', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de clientes.' })
  async findAll() {
    return await this.clientesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Cliente encontrado.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.clientesService.findOne(id);
    } catch (error) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Cliente removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  async remove(@Param('id') id: string) {
    try {
      return await this.clientesService.remove(id);
    } catch (error) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }
  }
}
