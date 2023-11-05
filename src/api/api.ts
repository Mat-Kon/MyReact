import { ICategory, IPeople, Items, Result } from '../types/types';

class Api {
  private apiUrl: string = 'https://swapi.dev/api/people';

  public getItems = async (page: number): Promise<Result> => {
    try {
      const resp = await fetch(`${this.apiUrl}/?page=${page}`);
      if (!resp.ok) {
        if (resp.status === 404) {
          console.log(`status ${resp.status} replace to search-page/1`);
        } else {
          throw new Error('Unexpected error occurred');
        }
      }
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
