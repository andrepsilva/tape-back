// dto/create-locacao.dto.ts
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { LocacaoStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocacaoDto {
  @ApiProperty({
    description: 'ID da reserva associada',
    example: '3244c9ed-d3df-44a4-846f-35528d28163f',
  })
  @IsNotEmpty()
  @IsString()
  reserva_id: string;

  @ApiProperty({
    description: 'ID do cliente associado',
    example: '2a483d3d-a932-4c05-8296-9dcf3df973af',
  })
  @IsNotEmpty()
  @IsString()
  cliente_id: string;

  @ApiProperty({
    description: 'Status da locação',
    enum: LocacaoStatus,
    example: LocacaoStatus.RESERVED,
  })
  @IsNotEmpty()
  @IsEnum(LocacaoStatus)
  status: LocacaoStatus;
}
