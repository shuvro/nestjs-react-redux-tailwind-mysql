import { Movie } from "../interfaces/movie.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("movie")
export class MovieEntity implements Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  yearReleased: number;

  @Column()
  createdBy: number;

  @Column({default: 'English'})
  language: string;

  @Column({nullable: true})
  imdb: string;
}
