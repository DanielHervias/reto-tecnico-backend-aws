import { Controller, Get, Param, Post } from "@nestjs/common";
import { SwapiService } from "./swapi.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("SWAPI API Español")
@Controller("swapi")
export class SwapiController {
  constructor(private readonly swapiService: SwapiService) {}

  @Get()
  @ApiOperation({
    summary:
      "Obtener los datos de planetas de Starwars y traducirlos a español",
  })
  obtenerPlanetasTraducir(): Promise<string> {
    return this.swapiService.obtenerPlanetasTraducir();
  }

  @Get(":id")
  @ApiOperation({
    summary:
      "Obtener los datos de un planeta de Starwars, lo traduce a español",
  })
  async obtenerUnaPlanetaTraducir(@Param("id") id: number): Promise<string> {
    try {
      const planeta = await this.swapiService.obtenerUnaPlanetaTraducir(id);
      return planeta;
    } catch (error) {
      console.error(error);
      return "Error al obtener la información del planeta";
    }
  }

  @Post(":id")
  @ApiOperation({
    summary:
      "Obtener los datos de un planeta de Starwars, traducirlo a español y almacenarlo en DynamoDB",
  })
  obtenerUnaPlanetaTraducirCrear(@Param("id") id: number): Promise<string> {
    return this.swapiService.obtenerUnaPlanetaTraducirCrear(id);
  }
}
