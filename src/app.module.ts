import { Module } from "@nestjs/common";
import { PlanetaModule } from "./planetas/planeta.module";
import { DynamoDBModule } from "./dynamo-db/dynamo-db.module";
import { SwapiModule } from "./swapi/swapi.module";

@Module({
  imports: [DynamoDBModule, PlanetaModule, SwapiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
