import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

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
}
