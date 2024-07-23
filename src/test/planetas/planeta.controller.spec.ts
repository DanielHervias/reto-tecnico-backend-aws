import { Test, TestingModule } from "@nestjs/testing";

import { PlanetaService } from "../../planetas/planeta.service";
import { PlanetaController } from "../../planetas/planeta.controller";

describe("PlanetaController", () => {
  let controller: PlanetaController;
  const mockPlanetaService = {
    buscarUno: jest.fn(() => {
      return {
        id: Date.now(),
        nombre: "Luke Skywalker",
      };
    }),
    buscar: jest.fn(() => {
      return [];
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetaController],
      providers: [PlanetaService],
    })
      .overrideProvider(PlanetaService)
      .useValue(mockPlanetaService)
      .compile();

    controller = module.get<PlanetaController>(PlanetaController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("deberia obtener, traducirlo y mostrar la data", () => {
    expect(controller.buscarUno("id")).toEqual({
      id: expect.any(Number),
      nombre: "Luke Skywalker",
    });
    expect(mockPlanetaService.buscarUno).toHaveBeenCalled();
  });

  it("deberia obtener y mostrar todos", () => {
    expect(controller.buscar()).toEqual([]);
    expect(mockPlanetaService.buscar).toHaveBeenCalled();
  });
});
