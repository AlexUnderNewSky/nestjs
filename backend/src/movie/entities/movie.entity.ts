import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieTags } from '../movie-tags.enum';
import { ReviewEntity } from 'src/review/entities/review.entity';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { MoviePosterEntity } from './poster-entity';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: MovieTags, default: MovieTags.ACTION })
  genre: MovieTags;

  @Column({ name: 'poster_id', type: 'uuid', nullable: true })
  posterId: string;

  @OneToOne(() => MoviePosterEntity, (poster) => poster.movie, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'poster_id' })
  poster: MoviePosterEntity | null;

  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[];

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  actors: ActorEntity[];

  @Column({
    type: 'int',
    unsigned: true,
  })
  releaseYear: number;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0.0 })
  rating: number;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
