import { Test, TestingModule } from "@nestjs/testing";
import { SwapiController } from "../../swapi/swapi.controller";
import { SwapiService } from "../../swapi/swapi.service";

describe("SwapiController", () => {
  let controller: SwapiController;

  const mockAppService = {
    obtenerUnPlanetaTraducirCrear: jest.fn(() => {
      return {
        id: Date.now(),
        nombre: "Luke Skywalker",
      };
    }),
    obtenerPlanetasTraducir: jest.fn(() => {
      return { conteo: 87 };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwapiController],
      providers: [SwapiService],
    })
      .overrideProvider(SwapiService)
      .useValue(mockAppService)
      .compile();

    controller = module.get<SwapiController>(SwapiController);
  });

  it("deberia estar definido", () => {
    expect(controller).toBeDefined();
  });

  it("deberia obtener, traducirlo y mostrar la data", () => {
    expect(controller.obtenerUnPlanetaTraducirCrear(1)).toEqual({
      id: expect.any(Number),
      nombre: "Luke Skywalker",
    });
    expect(mockAppService.obtenerUnPlanetaTraducirCrear).toHaveBeenCalled();
  });

  it("deberia obtener, traducir y mostrar el primer nivel", () => {
    expect(controller.obtenerPlanetasTraducir()).toEqual({
      conteo: expect.any(Number),
    });
    expect(mockAppService.obtenerPlanetasTraducir).toHaveBeenCalled();
  });
});
