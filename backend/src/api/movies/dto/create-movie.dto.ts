import { IsNotEmpty, IsNumber, IsOptional, IsUrl } from "class-validator";

export class CreateMovieDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  yearReleased: number;

  @IsOptional()
  @IsUrl()
  imdb: string;

  @IsOptional()
  language: string;

}
