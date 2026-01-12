import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity('movie_posters')
export class MoviePosterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @OneToOne(() => MovieEntity, (movie) => movie.poster)
  movie: MovieEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
