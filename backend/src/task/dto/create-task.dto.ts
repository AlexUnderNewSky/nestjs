import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @Length(2, 20, { message: 'Title must be between 2 and 20 characters' })
  title: string;
}
