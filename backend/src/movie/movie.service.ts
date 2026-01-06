import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CreateMovieDto } from './dto/create-movie.dto';

type Movie = {
  id: number;
  title: string;
};

@Injectable()
export class MovieService {
  private readonly filePathMovies = join(
    process.cwd(),
    'src/data/json/movies.json',
  );

  private async readMoviesFromFile() {
    const data = await readFile(this.filePathMovies, 'utf-8');
    return JSON.parse(data);
  }
  private async writeMoviesToFile(movies: Movie[]) {
    await writeFile(this.filePathMovies, JSON.stringify(movies, null, 2));
  }
  getAllMovies() {
    return this.readMoviesFromFile();
  }

  async getMoviesByGenre(genre: string) {
    const allData = await this.readMoviesFromFile();

    const movies = allData[genre];

    if (!movies) {
      return [];
    }
    return movies;
  }

  async addMovieToGenre(dto: CreateMovieDto) {
    const moviesData = await this.readMoviesFromFile();

    const targetGenre = dto.genre[0];

    if (!moviesData[targetGenre]) {
      moviesData[targetGenre] = [];
    }

    const currentGenreMovies = moviesData[targetGenre];

    const newId =
      currentGenreMovies.length > 0
        ? Math.max(...currentGenreMovies.map((m: any) => m.id)) + 1
        : 1;

    const newMovie = {
      id: newId,
      title: dto.title,
    };

    moviesData[targetGenre].push(newMovie);

    await this.writeMoviesToFile(moviesData);

    return newMovie;
  }
}
