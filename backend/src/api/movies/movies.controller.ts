import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Roles } from "../../shared/decorators/roles.decorators";
import { AuthUser } from "../../shared/decorators/auth-user.decorator";
import { User } from "../users/interfaces/user.interface";

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @Roles("user", "premium", "admin")
  async create(@Body() createMovieDto: CreateMovieDto, @AuthUser() user: User) {
    return await this.moviesService.create(createMovieDto, user.id);
  }

  @Get()
  @Roles("user", "premium", "admin")
  async findAll(@AuthUser() user: User) {
    return await this.moviesService.findAll(user.id);
  }

  @Get(':id')
  @Roles("user", "premium", "admin")
  async findOne(@Param('id') id: string) {
    return await this.moviesService.findOne(+id);
  }

  @Put(':id')
  @Roles("user", "premium", "admin")
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto, @AuthUser() user: User) {
    return await this.moviesService.update(+id, updateMovieDto, user.id);
  }

  @Delete(':id')
  @Roles("user", "premium", "admin")
  async remove(@Param('id') id: string) {
    return await this.moviesService.remove(+id);
  }
}
