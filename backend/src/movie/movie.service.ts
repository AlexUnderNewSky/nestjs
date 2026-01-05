import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

type Movie = {
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
}
