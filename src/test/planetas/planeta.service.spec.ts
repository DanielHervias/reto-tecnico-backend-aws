import { Test, TestingModule } from "@nestjs/testing";

import { PlanetaService } from "../../planetas/planeta.service";
import { DynamoDBService } from "../../dynamo-db/dynamo-db.service";

describe("PlanetaService", () => {
  let service: PlanetaService;
  const mockDynamoDB = {
    get: jest.fn(() => {
      return {
        id: Date.now(),
        nombre: "Luke Skywalker",
      };
    }),
    scan: jest.fn(() => {
      return [];
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [DynamoDBService],
      providers: [
        PlanetaService,
        {
          provide: DynamoDBService, // Specify the provider
          useValue: mockDynamoDB, // Use your mock implementation
        },
      ],
    }).compile();

    service = module.get<PlanetaService>(PlanetaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deberia obtener, traducirlo y mostrar la data", async () => {
    expect(await service.buscarUno("id")).toEqual({
      id: expect.any(Number),
      nombre: "Luke Skywalker",
    });
    expect(mockDynamoDB.get).toHaveBeenCalled();
  });

  it("deberia obtener y mostrar todos", async () => {
    expect(await service.buscar()).toEqual([]);
    expect(mockDynamoDB.scan).toHaveBeenCalled();
  });
});
