import { IsString, IsInt, IsDate, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFilmeDto {
  @ApiProperty({
    description: 'ID do TMDB do filme',
    example: 123,
  })
  @IsInt()
  tmdb_id: number;

  @ApiProperty({
    description: 'Nome do filme',
    example: 'Filme Exemplo',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Sinopse do filme',
    example: 'Uma descrição breve do filme.',
  })
  @IsString()
  sinopse: string;

  @ApiProperty({
    description: 'Classificação do filme',
    example: 'PG-13',
  })
  @IsString()
  classificacao: string;

  @ApiProperty({
    description: 'Data de lançamento do filme',
    example: '2024-01-01',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  data_lancamento: Date;

  @ApiProperty({
    description: 'Caminho para o pôster do filme',
    example: '/path/to/poster.jpg',
  })
  @IsString()
  poster_path: string;

  @ApiProperty({
    description: 'Caminho para o backdrop do filme',
    example: '/path/to/backdrop.jpg',
  })
  @IsString()
  backdrop_path: string;

  @ApiProperty({
    description: 'Popularidade do filme',
    example: 8.5,
  })
  @IsInt()
  popularidade: number;

  @ApiProperty({
    description: 'Número de votos do filme',
    example: 1500,
  })
  @IsInt()
  votos: number;

  @ApiProperty({
    description: 'Média de votos do filme',
    example: 7.8,
  })
  @IsInt()
  media_votos: number;

  @ApiProperty({
    description: 'Lista de IDs dos gêneros do filme',
    example: ['861c972a-4d2d-11ef-bfb2-5254003603d5', '861c9b9c-4d2d-11ef-bfb2-5254003603d5'],
  })
  @IsArray()
  @ArrayMinSize(1)
  generos: string[];
}
