import { hiddenLoader, viewLoader } from '../components/Loader';
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
    (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[]
  > {
    try {
      const resp = await this.response;
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      viewLoader();
      const data: ICategories = await resp.json();
      const categories: string[] = Object.keys(data);
      const allItems: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[] = [];
      for (const category of categories) {
        let nextPage: string = data[category as Category];

        while (nextPage) {
          const newResp = await fetch(nextPage);
          const newData: ICategory = await newResp.json();
          const resultsData: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[] =
            newData.results;
          allItems.push(...resultsData);
          nextPage = newData.next; // Ссылка на следующую страницу, если есть
        }
      }
      return allItems;
    } catch (error) {
      throw new Error(`Error in getAll: ${error}`);
    } finally {
      hiddenLoader();
    }
  }

  public async getCategory(
    category: Category
  ): Promise<(IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[]> {
    try {
      viewLoader();
      const response = await this.response;
      if (!response.ok) {
        throw new Error(`Network response was not ok, status is ${response.status}`);
      }
      const data: ICategories = await response.json();
      const allItems: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[] = [];

      if (data[category]) {
        let newUrl: string = data[category];

        while (newUrl) {
          const newResponse = await fetch(newUrl);
          const newData: ICategory = await newResponse.json();
          const results: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[] =
            newData.results;
          allItems.push(...results);
          newUrl = newData.next;
        }
      }
      return allItems;
    } catch (error) {
      throw new Error(`Error in getCategory ${error}`);
    } finally {
      hiddenLoader();
    }
  }
}

export { Api };
