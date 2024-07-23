import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { PlanetaService } from "./planeta.service";
import { CrearPlanetaDto } from "./dto/crear-planeta.dto";
import { ActualizarPlanetaDto } from "./dto/actualizar-planeta.dto";

@ApiTags("Planetas")
@Controller("planetas")
export class PlanetaController {
  constructor(private readonly planetaService: PlanetaService) {}

  @Post()
  @ApiOperation({
    summary: "Crear planeta",
  })
  crear(@Body() crearPlanetaDto: CrearPlanetaDto) {
    return this.planetaService.crear(crearPlanetaDto);
  }

  @Get()
  @ApiOperation({
    summary: "Buscar planetas",
  })
  buscar() {
    return this.planetaService.buscar();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Buscar una planeta",
  })
  buscarUno(@Param("id") id: string) {
    return this.planetaService.buscarUno(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Actualizar información planeta",
  })
  actualizar(@Param("id") id: string, @Body() actualizarPlanetaDto: ActualizarPlanetaDto) {
    return this.planetaService.actualizar(id, actualizarPlanetaDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Eliminar planeta",
  })
  remover(@Param("id") id: string) {
    return this.planetaService.remover(id);
  }
}
