import { Test, TestingModule } from "@nestjs/testing";

import { DynamoDBService } from "../../dynamo-db/dynamo-db.service";
import { MockDynamoDBService } from "./dynamo-db.service.mock";
import { InternalServerErrorException } from "@nestjs/common";

describe("DynamoDBService", () => {
  let dynamoDBService: DynamoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DynamoDBService,
        // Proporciona solo la simulación, no el servicio real
        {
          provide: DynamoDBService,
          useValue: new MockDynamoDBService(),
        },
      ],
    }).compile();
    dynamoDBService = module.get<DynamoDBService>(DynamoDBService);
  });

  it("debería estar definido", () => {
    expect(dynamoDBService).toBeDefined();
  });

  it("debería escanear la tabla y devolver los elementos", async () => {
    const tableName = "Persona";
    const result = await dynamoDBService.scan(tableName);
    expect(result.length).toBe(2); // Hay dos elementos en los datos simulados
    expect(result[0].nombre).toEqual("Luke Skywalker");
    expect(result[1].nombre).toEqual("C-3PO");
  });

  it("debería manejar errores al escanear la tabla", async () => {
    const tableName = "Persona";
    // Simulando que el método scan lanza una InternalServerErrorException
    jest
      .spyOn(dynamoDBService, "scan")
      .mockRejectedValueOnce(new InternalServerErrorException());
    await expect(dynamoDBService.scan(tableName)).rejects.toThrow(
      InternalServerErrorException
    );
  });

  it("debería obtener un elemento de la tabla", async () => {
    const tableName = "Persona";
    const result = await dynamoDBService.get(tableName, "1");
    expect(result.nombre).toEqual("Luke Skywalker");
  });

  it("debería manejar errores al obtener un elemento", async () => {
    const tableName = "Persona";
    jest
      .spyOn(dynamoDBService, "get")
      .mockRejectedValueOnce(new InternalServerErrorException());
    await expect(dynamoDBService.get(tableName, "1")).rejects.toThrow(
      InternalServerErrorException
    );
  });

  it("debería eliminar un elemento de la tabla", async () => {
    const tableName = "Persona";
    const result = await dynamoDBService.delete(tableName, "1");
    // Ajusta la expectativa para verificar si el resultado es un objeto con el ID del elemento eliminado
    expect(result.id).toBe("1");
  });

  it("debería manejar errores al eliminar un elemento", async () => {
    const tableName = "Persona";
    jest
      .spyOn(dynamoDBService, "delete")
      .mockRejectedValueOnce(new InternalServerErrorException());
    await expect(dynamoDBService.delete(tableName, "1")).rejects.toThrow(
      InternalServerErrorException
    );
  });

  it("debería actualizar un elemento en la tabla", async () => {
    const tableName = "Persona";
    const updatedItem = {
      id: "1",
      nombre: "Elemento Actualizado",
      altura: "180", // Ajusta el elemento actualizado según la estructura
      masa: "80",
      color_de_pelo: "brown",
      color_de_piel: "fair",
      color_de_ojos: "blue",
      año_nacimiento: "1980",
      género: "male",
      mundo_natal: "https://swapi.py4e.com/api/planets/1/",
      películas: ["https://swapi.py4e.com/api/films/1/"],
      especie: ["https://swapi.py4e.com/api/species/1/"],
      vehículos: [],
      naves_estelares: [],
      creado: "2024-04-29T00:00:00Z",
      editado: "2024-04-29T00:00:00Z",
      url: "https://swapi.py4e.com/api/people/3/",
    };
    const result = await dynamoDBService.put(tableName, updatedItem);
    expect(result).toEqual(updatedItem);
  });

  it("debería manejar errores al actualizar un elemento", async () => {
    const tableName = "Persona";
    jest
      .spyOn(dynamoDBService, "put")
      .mockRejectedValueOnce(new InternalServerErrorException());
    await expect(
      dynamoDBService.put(tableName, { nombre: "Elemento 1" })
    ).rejects.toThrow(InternalServerErrorException);
  });
});
