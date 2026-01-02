import { PartialType } from '@nestjs/mapped-types';
import { UpdateTaskDto } from './update-task.dto';
import { IsString, IsNotEmpty, Length, IsBoolean } from 'class-validator';

export class PatchTaskDto extends PartialType(UpdateTaskDto) {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @Length(2, 20, { message: 'Title must be between 2 and 20 characters' })
  title: string;

  @IsBoolean()
  isCompleted: boolean;
}
