export class MockDynamoDBService {
  constructor() {}

  async scan(tableName: string): Promise<any[]> {
    return [
      {
        id: "1",
        nombre: "Luke Skywalker",
        altura: "172",
        masa: "77",
        color_de_pelo: "blond",
        color_de_piel: "fair",
        color_de_ojos: "blue",
        año_nacimiento: "19BBY",
        género: "male",
        mundo_natal: "https://swapi.py4e.com/api/planets/1/",
        películas: [
          "https://swapi.py4e.com/api/films/1/",
          "https://swapi.py4e.com/api/films/2/",
          "https://swapi.py4e.com/api/films/3/",
          "https://swapi.py4e.com/api/films/6/",
          "https://swapi.py4e.com/api/films/7/",
        ],
        especie: ["https://swapi.py4e.com/api/species/1/"],
        vehículos: [
          "https://swapi.py4e.com/api/vehicles/14/",
          "https://swapi.py4e.com/api/vehicles/30/",
        ],
        naves_estelares: [
          "https://swapi.py4e.com/api/starships/12/",
          "https://swapi.py4e.com/api/starships/22/",
        ],
        creado: "2014-12-09T13:50:51.644000Z",
        editado: "2014-12-20T21:17:56.891000Z",
        url: "https://swapi.py4e.com/api/people/1/",
      },
      {
        id: "2",
        nombre: "C-3PO",
        altura: "167",
        masa: "75",
        color_de_pelo: "n/a",
        color_de_piel: "gold",
        color_de_ojos: "yellow",
        año_nacimiento: "112BBY",
        género: "n/a",
        mundo_natal: "https://swapi.py4e.com/api/planets/1/",
        películas: [
          "https://swapi.py4e.com/api/films/1/",
          "https://swapi.py4e.com/api/films/2/",
          "https://swapi.py4e.com/api/films/3/",
          "https://swapi.py4e.com/api/films/4/",
          "https://swapi.py4e.com/api/films/5/",
          "https://swapi.py4e.com/api/films/6/",
        ],
        especie: ["https://swapi.py4e.com/api/species/2/"],
        vehículos: [],
        naves_estelares: [],
        creado: "2014-12-10T15:10:51.357000Z",
        editado: "2014-12-20T21:17:50.309000Z",
        url: "https://swapi.py4e.com/api/people/2/",
      },
    ];
  }

  async get(tableName: string, id: string): Promise<any> {
    if (id === "1") {
      return {
        nombre: "Luke Skywalker",
        altura: "172",
        masa: "77",
        color_de_pelo: "blond",
        color_de_piel: "fair",
        color_de_ojos: "blue",
        año_nacimiento: "19BBY",
        género: "male",
        mundo_natal: "https://swapi.py4e.com/api/planets/1/",
        películas: [
          "https://swapi.py4e.com/api/films/1/",
          "https://swapi.py4e.com/api/films/2/",
          "https://swapi.py4e.com/api/films/3/",
          "https://swapi.py4e.com/api/films/6/",
          "https://swapi.py4e.com/api/films/7/",
        ],
        especie: ["https://swapi.py4e.com/api/species/1/"],
        vehículos: [
          "https://swapi.py4e.com/api/vehicles/14/",
          "https://swapi.py4e.com/api/vehicles/30/",
        ],
        naves_estelares: [
          "https://swapi.py4e.com/api/starships/12/",
          "https://swapi.py4e.com/api/starships/22/",
        ],
        creado: "2014-12-09T13:50:51.644000Z",
        editado: "2014-12-20T21:17:56.891000Z",
        url: "https://swapi.py4e.com/api/people/1/",
      };
    } else if (id === "2") {
      return {
        nombre: "C-3PO",
        altura: "167",
        masa: "75",
        color_de_pelo: "n/a",
        color_de_piel: "gold",
        color_de_ojos: "yellow",
        año_nacimiento: "112BBY",
        género: "n/a",
        mundo_natal: "https://swapi.py4e.com/api/planets/1/",
        películas: [
          "https://swapi.py4e.com/api/films/1/",
          "https://swapi.py4e.com/api/films/2/",
          "https://swapi.py4e.com/api/films/3/",
          "https://swapi.py4e.com/api/films/4/",
          "https://swapi.py4e.com/api/films/5/",
          "https://swapi.py4e.com/api/films/6/",
        ],
        especie: ["https://swapi.py4e.com/api/species/2/"],
        vehículos: [],
        naves_estelares: [],
        creado: "2014-12-10T15:10:51.357000Z",
        editado: "2014-12-20T21:17:50.309000Z",
        url: "https://swapi.py4e.com/api/people/2/",
      };
    }
    // If the ID is neither '1' nor '2', return null
    return null;
  }

  async put(tableName: string, item: Record<string, any>): Promise<any> {
    return item;
  }

  async delete(tableName: string, id: string): Promise<any> {
    return { id };
  }
}
