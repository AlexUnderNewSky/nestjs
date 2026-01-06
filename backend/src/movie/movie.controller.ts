import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import type { Request, Response } from 'express';

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

  @Get('genres')
  getGenres() {
    return this.movieService.getGenres();
  }

  @Get('headers')
  getHeaders(@Headers() headers: any) {
    return headers;
  }

  @Get('user-agent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return { userAgent };
  }

  @Get('request')
  getRequestDetails(@Req() req: Request) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      params: req.params,
    };
  }

  @Get('response')
  getResponseDetails(@Res() res: Response) {
    res.status(201).json({ message: 'This is a custom response' });
  }

  @Get(':id')
  getMyId(@Param('id') id: string) {
    return { id };
  }

  @Post('add')
  addMovieToGenre(@Body() dto: CreateMovieDto) {
    return this.movieService.addMovieToGenre(dto);
  }
}
