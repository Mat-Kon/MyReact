import { Category, ICategories, ICategory, Item } from '../types/types';

class Api {
  private apiUrl: string = 'https://swapi.dev/api/?format=json';
  private response: Promise<Response>;

  constructor() {
    this.response = fetch(this.apiUrl);
  }

  public async getAll(): Promise<Item[]> {
    try {
      const resp = await this.response;
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ICategories = await resp.json();
      const categories: string[] = Object.keys(data);
      const allItems: Item[] = [];
      for (const category of categories) {
        let nextPage: string = data[category as Category];

        while (nextPage) {
          const newResp = await fetch(nextPage);
          const newData: ICategory = await newResp.json();
          const resultsData: Item[] = newData.results;
          allItems.push(...resultsData);
          nextPage = newData.next;
        }
      }
      return allItems;
    } catch (error) {
      throw new Error(`Error in getAll: ${error}`);
    } finally {
    }
  }
}

export { Api };
