import { Module } from "@nestjs/common";
import { PlanetaController } from "./planeta.controller";
import { PlanetaService } from "./planeta.service";
import { DynamoDBModule } from "../dynamo-db/dynamo-db.module";

@Module({
  imports: [DynamoDBModule],
  controllers: [PlanetaController],
  providers: [PlanetaService],
})
export class PlanetaModule {}
