import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('all')
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string | number) {
    return this.movieService.findById(+id);
  }
  @Post('create')
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.create(dto);
  }

  @Patch('update/:id')
  updateMovie(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    return this.movieService.updateMovie(+id, dto);
  }

  @Patch('/status/:id')
  togglePublicStatus(
    @Param('id') id: string,
    @Body('isPublic') isPublic: boolean,
  ) {
    return this.movieService.togglePublicStatus(+id, isPublic);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string | number) {
    return this.movieService.deleteById(+id);
  }
}

// @Get('all')
// getAllMovies() {
//   return this.movieService.getAllMovies();
// }

// @Get('by-genre')
// getMoviesByGenre(@Query('genre') genre: string) {
//   return this.movieService.getMoviesByGenre(genre);
// }

// @Get('genres')
// getGenres() {
//   return this.movieService.getGenres();
// }

// @Get('headers')
// getHeaders(@Headers() headers: any) {
//   return headers;
// }

// @Get('user-agent')
// getUserAgent(@Headers('user-agent') userAgent: string) {
//   return { userAgent };
// }

// @Get('request')
// getRequestDetails(@Req() req: Request) {
//   return {
//     method: req.method,
//     url: req.url,
//     headers: req.headers,
//     query: req.query,
//     params: req.params,
//   };
// }

// @Get('response')
// getResponseDetails(@Res() res: Response) {
//   res.status(201).json({ message: 'This is a custom response' });
// }

// @Get(':id')
// getMyId(@Param('id') id: string) {
//   return { id };
// }

// @Post('add')
// addMovieToGenre(@Body() dto: CreateMovieDto) {
//   return this.movieService.addMovieToGenre(dto);
// }
