import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { MovieTags } from '../movie-tags.enum';

export class UpdateMovieDto {
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title: string;

  @IsOptional()
  @IsArray({ message: 'Tags must be an array of strings' })
  @IsEnum(MovieTags, {
    each: true,
    message: 'Each tag must be a valid enum value',
  })
  genre: MovieTags[];

  @IsOptional()
  @IsInt({ message: 'Release year must be an integer' })
  @Min(1888, { message: 'Release year must be no earlier than 1888' })
  @Max(new Date().getFullYear())
  releaseYear: number;
}
