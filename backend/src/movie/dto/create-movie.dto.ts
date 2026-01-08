import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { MovieTags } from '../movie-tags.enum';

export class CreateMovieDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsNotEmpty({ message: 'Genre cannot be empty' })
  @IsArray({ message: 'Tags must be an array of strings' })
  @IsEnum(MovieTags, {
    each: true,
    message: 'Each tag must be a valid enum value',
  })
  genre: MovieTags[];

  @IsNotEmpty({ message: 'Release year cannot be empty' })
  @IsInt({ message: 'Release year must be an integer' })
  @Min(1888, { message: 'Release year must be no earlier than 1888' })
  @Max(new Date().getFullYear())
  releaseYear: number;
}
