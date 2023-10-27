import { ICategory, Items, Result } from '../types/types';

class Api {
  private apiUrl: string = 'https://swapi.dev/api/people';

  public getItems = async (page: number): Promise<Items> => {
    try {
      const resp = await fetch(`${this.apiUrl}/?page=${page}`);
      const data: ICategory = await resp.json();
      const result: Items = data.results;
      return result;
    } catch {
      throw new Error(`Error in getAll`);
    }
  };

  public getSearchItems = async (value: string, page: number): Promise<Result> => {
    try {
      const searchValue: string = value.trim();
      const resp = await fetch(`${this.apiUrl}/?search=${searchValue}&page=${page}`);
      const data: ICategory = await resp.json();
      const result = {
        items: data.results,
        count: data.count,
      };
      return result;
    } catch {
      throw new Error(`Error in getAll`);
    }
  };
}

export { Api };
