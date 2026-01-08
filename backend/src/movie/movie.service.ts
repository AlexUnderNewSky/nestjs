import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';

type Movie = {
  id: number;
  title: string;
};

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      where: {
        isPublic: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async create(dto: CreateMovieDto): Promise<MovieEntity> {
    const movie = this.movieRepository.create(dto);

    return await this.movieRepository.save(movie);
  }

  async togglePublicStatus(id: number, status: boolean): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    movie.isPublic = status;
    return await this.movieRepository.save(movie);
  }
}

// private readonly filePathMovies = join(
//   process.cwd(),
//   'src/data/json/movies.json',
// );

// private async readMoviesFromFile() {
//   const data = await readFile(this.filePathMovies, 'utf-8');
//   return JSON.parse(data);
// }
// private async writeMoviesToFile(movies: Movie[]) {
//   await writeFile(this.filePathMovies, JSON.stringify(movies, null, 2));
// }
// getAllMovies() {
//   return this.readMoviesFromFile();
// }

// async getMoviesByGenre(genre: string) {
//   const allData = await this.readMoviesFromFile();

//   const movies = allData[genre];

//   if (!movies) {
//     return [];
//   }
//   return movies;
// }

// async getGenres() {
//   const moviesData = await this.readMoviesFromFile();
//   return Object.keys(moviesData);
// }

// async addMovieToGenre(dto: CreateMovieDto) {
//   const moviesData = await this.readMoviesFromFile();

//   const targetGenre = dto.genre[0];

//   if (!moviesData[targetGenre]) {
//     moviesData[targetGenre] = [];
//   }

//   const currentGenreMovies = moviesData[targetGenre];

//   const newId =
//     currentGenreMovies.length > 0
//       ? Math.max(...currentGenreMovies.map((m: any) => m.id)) + 1
//       : 1;

//   const newMovie = {
//     id: newId,
//     title: dto.title,
//   };

//   moviesData[targetGenre].push(newMovie);

//   await this.writeMoviesToFile(moviesData);

//   return newMovie;
// }
