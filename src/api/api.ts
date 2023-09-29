import {
  Category,
  ICategories,
  ICategory,
  IFilm,
  IPeople,
  IPlanet,
  ISpecies,
  IStarShips,
  IVehicles,
} from '../types/types';

class Api {
  private apiUrl: string = 'https://swapi.dev/api/?format=json';
  private response: Promise<Response>;

  constructor() {
    this.response = fetch(this.apiUrl);
  }

  public async getAll(): Promise<
    (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[][]
  > {
    try {
      const resp = await this.response;
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ICategories = await resp.json();
      const categories: string[] = Object.keys(data);
      const result: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[][] =
        await Promise.all(
          categories.map(async (category) => {
            const newResp = await fetch(data[category as Category]);
            const newData: ICategory = await newResp.json();
            const resultsData: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[] =
              newData.results;
            return resultsData;
          })
        );
      return result;
    } catch (error) {
      throw new Error(`Error in getAll: ${error}`);
    }
  }

  public async getCategory(
    category: Category
  ): Promise<null | (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[]> {
    try {
      const response = await this.response;
      if (response.ok) {
        const data: ICategories = await response.json();
        if (data[category]) {
          const newUrl = data[category];
          const newResponse = await fetch(newUrl);
          const newData: ICategory = await newResponse.json();
          const results: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[] =
            newData.results;
          return results;
        }
        return null;
      }
      throw new Error(`Network response was not ok, status is ${response.status}`);
    } catch (error) {
      throw new Error(`Error in getCategory ${error}`);
    }
  }
}

export { Api };
