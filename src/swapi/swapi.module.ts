import { Module } from "@nestjs/common";
import { SwapiService } from "./swapi.service";
import { SwapiController } from "./swapi.controller";
import { Translate } from "../utils/translate";
import { DynamoDBModule } from "../dynamo-db/dynamo-db.module";
import { DynamoDBService } from "../dynamo-db/dynamo-db.service";

@Module({
  imports: [DynamoDBModule],
  controllers: [SwapiController],
  providers: [SwapiService, Translate, DynamoDBService],
})
export class SwapiModule {}
