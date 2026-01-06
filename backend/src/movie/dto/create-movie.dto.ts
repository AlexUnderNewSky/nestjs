import { IsArray, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { MovieTags } from '../movie-tags.enum';

export class CreateMovieDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @Length(2, 20, { message: 'Title must be between 2 and 20 characters' })
  title: string;

  @IsNotEmpty({ message: 'Genre cannot be empty' })
  @IsArray({ message: 'Tags must be an array of strings' })
  @IsEnum(MovieTags, {
    each: true,
    message: 'Each tag must be a valid enum value',
  })
  genre: MovieTags[];
}
