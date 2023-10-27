import { Category, ICategories, ICategory, Item } from '../types/types';

const categories: string[] = ['people', 'planets', 'films', 'species', 'vehicles', 'starships'];

class Api {
  private apiUrl: string = 'https://swapi.dev/api/';

  private getItemsFromCategory = async (categoryUrl: string) => {
    const newResp = await fetch(categoryUrl);
    if (newResp.status === 404) {
      return;
    }
    const newData: ICategory = await newResp.json();
    const resultsData: Item[] = newData.results;
    const result = {
      items: resultsData,
      url: newData,
    };
    return result;
  };

  private getItemsFromCategories = async (data: ICategories): Promise<Item[]> => {
    const categories: string[] = Object.keys(data);
    const allItems: Item[] = [];
    for (const category of categories) {
      let nextPage: string = data[category as Category];
      while (nextPage) {
        try {
          const item = await this.getItemsFromCategory(nextPage);
          if (item) {
            allItems.push(...item.items);
            nextPage = item.url.next;
          }
        } catch {
          console.error('Error in getItems');
        }
      }
    }
    return allItems;
  };

  public getAll = async (): Promise<Item[]> => {
    try {
      const resp = await fetch(this.apiUrl);
      const data: ICategories = await resp.json();
      const items: Promise<Item[]> = this.getItemsFromCategories(data);
      return items;
    } catch (error: unknown) {
      throw new Error(`Error in getAll`);
    }
  };

  public getSearchItems = async (value: string): Promise<Item[]> => {
    const searchValue: string = value.trim();
    const items: Item[] = [];
    const fetchPromises = categories.map(async (category: string) => {
      try {
        const resp = await fetch(`${this.apiUrl}/${category}/?search=${searchValue}`);
        const data: ICategory = await resp.json();
        if (data.next !== null) {
          items.push(...data.results);
        }
        if (data.results.length > 0) {
          items.push(...data.results);
        }
      } catch {
        console.log('Error in getSearchItems');
      }
    });
    await Promise.all(fetchPromises);
    return items;
  };
}

export { Api };
