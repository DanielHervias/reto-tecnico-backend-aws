import { Injectable, InternalServerErrorException } from "@nestjs/common";
import axios from "axios";
import { DynamoDBService } from "../dynamo-db/dynamo-db.service";
import { CrearPlanetaDto } from "../planetas/dto/crear-planeta.dto";
import { Translate } from "../utils/translate";
import { ErrorValidacion, validatorDto } from "../utils/validator-dto";
import { SwapiPlanet } from "./interfaces/planeta.interface";

@Injectable()
export class SwapiService {
  private readonly baseUrl = "https://swapi.py4e.com/api";
  private readonly translator: Translate;
  constructor(
    private readonly dynamoDBService: DynamoDBService,
    translator: Translate
  ) {
    this.translator = translator;
  }

  async obtenerPlanetasTraducir(): Promise<string> {
    try {
      const data = await this.obtenerDataSwapi(`${this.baseUrl}/planets/`);
      const dataTraducida = await this.traducirData(data);
      return JSON.stringify(dataTraducida, null, 2);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async obtenerUnaPlanetaTraducir(id: number): Promise<any> {
    try {
      const data = await this.obtenerDataSwapi(`${this.baseUrl}/planets/${id}/`);
      if (data) {
        const dataTraducida = await this.traducirUno(data);
        return JSON.stringify(dataTraducida, null, 2);
      }
      return "No se encontró el planetaje";
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async obtenerUnaPlanetaTraducirCrear(id: number): Promise<any> {
    try {
      const data = await this.obtenerDataSwapi(`${this.baseUrl}/planets/${id}/`);

      // Traducir data
      const dataTraducida = await this.traducirUno(data);

      // Validar data
      const err: ErrorValidacion = await validatorDto(
        CrearPlanetaDto,
        dataTraducida
      );
      if (err.problema.length > 0) {
        return err;
      }

      const planeta = await this.dynamoDBService.put("Planeta", dataTraducida);
      if (!planeta) {
        return { mensaje: "Error al intentar ingresar planetaje en la bd" };
      }

      return JSON.stringify(dataTraducida, null, 2);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async obtenerDataSwapi(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 error
        console.error(
          "No se encontró el recurso solicitado. Por favor, inténtelo nuevamente con un recurso válido."
        );
        // Display a user-friendly message
      } else {
        // Handle other errors
        console.error("Ocurrió un error al obtener los datos:", error.message);
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async traducirData(data: any) {
    let json: any = {};
    json = await this.traducirUno(data);
    const { resultados, ...jsonPrimerNivel } = json;
    const todosLosResultados = [];
    for (const resultados of data.results) {
      todosLosResultados.push(await this.traducirUno(resultados));
    }
    return {
      ...jsonPrimerNivel,
      resultados: todosLosResultados,
    };
  }

  async traducirUno(data: SwapiPlanet) {
    const resultados = data;
    const llaves: string[] = Object.keys(resultados);
    const valores: string[] = llaves.map((key) => resultados[key]);
    const llavesString = llaves.join(`\n `);
    const llavesStringTraducidas = await this.translator.translateText(
      llavesString
    );
    const llavesArregloTraducidas = llavesStringTraducidas.split("\n ");
    const objetoTraducido: { [key: string]: string } = {};

    llavesArregloTraducidas.forEach((item, index) => {
      const llave = llavesArregloTraducidas[index];
      const llaveFormatoSwapi = llave.replace(/ /g, "_");
      const valor = valores[index];
      objetoTraducido[llaveFormatoSwapi] = valor;
    });

    return objetoTraducido;
  }
}
