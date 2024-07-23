import { Injectable } from "@nestjs/common";
import { DynamoDBService } from "../dynamo-db/dynamo-db.service";
import { CrearPlanetaDto } from "./dto/crear-planeta.dto";
import { ActualizarPlanetaDto } from "./dto/actualizar-planeta.dto";
import { ErrorValidacion, validatorDto } from "../utils/validator-dto";

@Injectable()
export class PlanetaService {
  private readonly tablaPlaneta = "Swapi_planetas";
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async crear(crearPlanetaDto: CrearPlanetaDto) {
    const err: ErrorValidacion = await validatorDto(
      CrearPlanetaDto,
      crearPlanetaDto
    );
    if (err.problema.length > 0) {
      return err;
    }
    return await this.dynamoDBService.put(this.tablaPlaneta, crearPlanetaDto);
  }

  async buscar() {
    return await this.dynamoDBService.scan(this.tablaPlaneta);
  }

  async buscarUno(id: string) {
    return await this.dynamoDBService.get(this.tablaPlaneta, id);
  }

  async remover(id: string) {
    return await this.dynamoDBService.delete(this.tablaPlaneta, id);
  }

  async actualizar(id: string, updatePersonDto: ActualizarPlanetaDto) {
    return await this.dynamoDBService.update(this.tablaPlaneta, id, updatePersonDto);
  }
}
