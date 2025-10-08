import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({ message: 'title is required' })
  @ApiProperty({ description: 'title of todo' })
  title: string;
}
