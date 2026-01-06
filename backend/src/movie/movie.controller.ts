import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('all')
  getAllMovies() {
    return this.movieService.getAllMovies();
  }

  @Get('by-genre')
  getMoviesByGenre(@Query('genre') genre: string) {
    return this.movieService.getMoviesByGenre(genre);
  }

  @Post('add')
  addMovieToGenre(@Body() dto: CreateMovieDto){
    return this.movieService.addMovieToGenre(dto);
  }
}
