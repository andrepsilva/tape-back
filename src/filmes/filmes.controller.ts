import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('filmes')
@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Filme criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createFilmeDto: CreateFilmeDto) {
    try {
      return await this.filmesService.create(createFilmeDto);
    } catch (error) {
      throw new HttpException('Erro ao criar filme', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de filmes.' })
  async findAll() {
    return await this.filmesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Filme encontrado.' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado.' })
  async findOne(@Param('id') id: string) {
    const filme = await this.filmesService.findOne(id);
    if (!filme) {
      throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
    }
    return filme;
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Filme removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado.' })
  async remove(@Param('id') id: string) {
    const filme = await this.filmesService.remove(id);
    if (!filme) {
      throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
    }
    return filme;
  }
}
