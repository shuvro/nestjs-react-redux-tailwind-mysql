import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MovieEntity } from "./entities/movie.entity";
import { Movie } from "./interfaces/movie.interface";

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(MovieEntity) private movieRepository: Repository<MovieEntity>) { }

  async create(createMovieDto: CreateMovieDto, userId: number): Promise<Movie> {
    const movieEntity = new MovieEntity();
    movieEntity.name = createMovieDto.name;
    movieEntity.yearReleased = createMovieDto.yearReleased;
    movieEntity.imdb = createMovieDto.imdb;
    movieEntity.language = createMovieDto.language
    movieEntity.createdBy = userId

    return await this.movieRepository.save(movieEntity);
  }

  async findAll(userId: number): Promise<Movie[]> {
    return await this.movieRepository.find({createdBy: userId})
  }

  async findOne(id: number): Promise<Movie> {
    return await this.movieRepository.findOne(id);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto, userId: number): Promise<Movie> {
    const movieEntity = new MovieEntity();
    movieEntity.name = updateMovieDto.name;
    movieEntity.yearReleased = updateMovieDto.yearReleased;
    movieEntity.imdb = updateMovieDto.imdb;
    movieEntity.language = updateMovieDto.language
    movieEntity.createdBy = userId

    const updated = await this.movieRepository.update(id, movieEntity)
    if (!updated) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND)
    }
    return await this.movieRepository.findOne(id)
  }

  async remove(id: number) {
    const deletedMovie = await this.movieRepository.delete(id)
    if (!deletedMovie.affected) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND)
    }
  }
}
