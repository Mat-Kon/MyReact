import { Category, ICategories, ICategory, Item } from '../types/types';

const categories: string[] = ['people', 'planets', 'films', 'species', 'vehicles', 'starships'];

class Api {
  private apiUrl: string = 'https://swapi.dev/api/';
  private response: Promise<Response>;

  constructor() {
    this.response = fetch(this.apiUrl);
  }

  private async getItems(data: ICategories): Promise<Item[]> {
    const categories: string[] = Object.keys(data);
    const allItems: Item[] = [];
    for (const category of categories) {
      let nextPage: string = data[category as Category];
      while (nextPage) {
        try {
          const newResp = await fetch(nextPage);
          const newData: ICategory = await newResp.json();
          const resultsData: Item[] = newData.results;
          allItems.push(...resultsData);
          nextPage = newData.next;
        } catch {
          console.error('Error in getItems');
        }
      }
    }
    return allItems;
  }

  public async getAll(): Promise<Item[]> {
    try {
      const resp = await this.response;
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ICategories = await resp.json();
      const items: Promise<Item[]> = this.getItems(data);
      return items;
    } catch (error) {
      throw new Error(`Error in getAll: ${error}`);
    }
  }

  public async getSearchItems(value: string): Promise<Item[]> {
    try {
      const searchValue: string = value.trim();
      const items: Item[] = [];
      const fetchPromises = categories.map(async (category: string) => {
        const resp = await fetch(`${this.apiUrl}/${category}/?search=${searchValue}`);
        const data: ICategory = await resp.json();
        if (data.results.length > 0) {
          const results = data.results;
          items.push(...results);
        }
      });
      await Promise.all(fetchPromises);
      return items;
    } catch (error) {
      throw new Error(`Error in getAll: ${error}`);
    }
  }
}

export { Api };
