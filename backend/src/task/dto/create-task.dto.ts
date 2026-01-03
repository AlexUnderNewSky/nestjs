import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';
import { TaskTags } from '../task-tags.enum';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
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

  @IsString({ message: 'Password must be a string' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain at least one uppercase letter and one number',
  })
  password: string;

  @IsUrl({protocols: ['http', 'https']}, { message: 'Website URL must be a valid URL' })
  websiteUrl: string;
}
