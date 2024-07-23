import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray, IsString } from "class-validator";

export class CrearPlanetaDto {
  @ApiProperty({
    example: "Tatooine",
    description: "El nombre del planeta",
  })
  @IsString({ message: (args) => `${args.property} debe ser string` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  nombre: string;

  @ApiProperty({
    example: "17242",
    description: "El diametro del planeta en km",
  })
  @IsString({ message: (args) => `${args.property} debe ser string` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  diametro: string;

  @ApiProperty({
    example: 125,
    description:
      "El número de horas estándar que le toma a este planeta completar una sola rotación sobre su eje",
  })
  @IsString({ message: (args) => `${args.property} debe ser string` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  periodo_de_rotacion: string;

  @ApiProperty({
    example: 125,
    description:
      "El número de días estándar que le toma a este planeta completar una única órbita de su estrella local.",
  })
  @IsString({ message: (args) => `${args.property} debe ser string` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  periodo_orbital: string;

  @ApiProperty({
    example: "1",
    description: "Un número que denota la gravedad de este planeta.",
  })
  @IsString({ message: (args) => `${args.property} debe ser string` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  gravedad: string;

  @ApiProperty({
    example: "120000",
    description:
      "Un número que denota la cantidad de habitantes de este planeta.",
  })
  @IsString({ message: (args) => `${args.property} debe ser string` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  poblacion: string;

  @ApiProperty({
    example: "Arid",
    description: "El clima del planeta",
  })
  @IsString({ message: (args) => `${args.property} debe ser string` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  clima: string;

  @ApiProperty({
    example: "Dessert",
    description:
      "El terreno de este planeta. Separados por comas si son diversos",
  })
  @IsString({ message: (args) => `${args.property} debe ser string` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  terreno: string;

  @ApiProperty({
    example: "1",
    description:
      "El porcentaje de la superficie del planeta que es agua o masas de agua naturales",
  })
  @IsString({ message: (args) => `${args.property} debe ser string` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  superficie_de_agua: string;

  @ApiProperty({
    example: [
      "https://swapi.py4e.com/api/people/1/",
      "https://swapi.py4e.com/api/people/2/",
    ],
    description:
      "Una variedad de recursos URL de planetas que viven en este planeta.",
  })
  @IsArray({ message: (args) => `${args.property} debe ser un array` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  residentes: string[];

  @ApiProperty({
    example: [
      "https://swapi.py4e.com/api/films/1/",
      "https://swapi.py4e.com/api/films/2/",
    ],
    description:
      "Un arreglo de recursos de URL de películas en las que ha aparecido este planeta.",
  })
  @IsArray({ message: (args) => `${args.property} debe ser array` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  peliculas: string[];

  @ApiProperty({
    example: "https://swapi.py4e.com/api/planets/1/",
    description: "la URL de este recurso",
  })
  @IsString({ message: (args) => `${args.property} debe ser string` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  url: string;

  @ApiProperty({
    example: "2014-12-10T15:10:51.357000Z",
    description: "La creacion de los datos json",
  })
  @IsString({ message: (args) => `${args.property} debe ser string` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  creado: string;

  @ApiProperty({
    example: "2014-12-10T15:10:51.357000Z",
    description: "La fecha en que se edito los datos json",
  })
  @IsString({ message: (args) => `${args.property} debe ser number` })
  @IsNotEmpty({ message: (args) => `${args.property} es requerido` })
  editado: string;
}
