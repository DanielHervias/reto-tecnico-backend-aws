import { PartialType, ApiProperty } from "@nestjs/swagger";
import { CrearPlanetaDto } from "./crear-planeta.dto";

export class ActualizarPlanetaDto extends PartialType(CrearPlanetaDto) {
  @ApiProperty({
    example: "1",
    description: "El id de planeta",
  })
  id: string;
}
