import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { TaskTags } from '../task-tags.enum';
import { StartsWith } from '../decorators/start-with.decorator';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @StartsWith('Task:', { message: 'Non-valid title, must start with - Task:' })
  @Length(2, 20, { message: 'Title must be between 2 and 20 characters' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  @Length(5, 200, {
    message: 'Description must be between 5 and 200 characters',
  })
  description: string;

  @IsInt({ message: 'Priority must be an integer' })
  @IsOptional({ message: 'Priority is optional' })
  @IsPositive({ message: 'Priority must be a positive number' })
  priority: number;

  @IsOptional()
  @IsArray({ message: 'Tags must be an array of strings' })
  @IsEnum(TaskTags, {
    each: true,
    message: 'Each tag must be a valid enum value',
  })
  tags: TaskTags[];
}
