import { ICategory, IPeople, Items, Result } from '../types/types';

class Api {
  private apiUrl: string = 'https://swapi.dev/api/people';

  public getItems = async (page: number): Promise<Result> => {
    try {
      const resp = await fetch(`${this.apiUrl}/?page=${page}`);
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

  public getItemByName = async (value: string) => {
    try {
      const searchValue: string = value.trim();
      const resp = await fetch(`${this.apiUrl}/?search=${searchValue}`);
      const data: ICategory = await resp.json();
      return data.results[0];
    } catch {
      throw new Error('Error in getItemByName');
    }
  };
}

export { Api };
