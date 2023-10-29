import { ICategory, Items, Result } from '../types/types';

class Api {
  private apiUrl: string = 'https://swapi.dev/api/people';

  private getItemsFromCategory = async (categoryUrl: string): Promise<Result | undefined> => {
    const newResp = await fetch(categoryUrl);
    if (newResp.status === 404) {
      return;
    }
    const newData: ICategory = await newResp.json();
    const resultsData: Items = newData.results;
    const result: Result = {
      items: resultsData,
      url: newData,
    };
    return result;
  };

  private getItemsFromCategories = async (data: ICategory): Promise<Items> => {
    const allItems: Items = [];
    allItems.push(...data.results);
    let nextPage: string = data.next;
    while (nextPage) {
      try {
        const item: Result | undefined = await this.getItemsFromCategory(nextPage);
        if (item) {
          allItems.push(...item.items);
          nextPage = item.url.next;
        }
      } catch {
        console.error('Error in getItems');
      }
    }
    return allItems;
  };

  public getAll = async (): Promise<Items> => {
    try {
      const resp = await fetch(this.apiUrl);
      const data: ICategory = await resp.json();
      const items: Items = await this.getItemsFromCategories(data);
      return items;
    } catch (error: unknown) {
      throw new Error(`Error in getAll`);
    }
  };

  public getSearchItems = async (value: string): Promise<Items> => {
    const searchValue: string = value.trim();
    const items: Items = [];
    try {
      const resp = await fetch(`${this.apiUrl}/?search=${searchValue}`);
      const data: ICategory = await resp.json();
      if (data.next !== null) {
        items.push(...data.results);
        const newItems: Items = await this.getItemsFromCategories(data);
        items.push(...newItems);
      }
      if (data.results.length > 0) {
        items.push(...data.results);
      }
    } catch {
      console.log('Error in getSearchItems');
    }
    return items;
  };
}

export { Api };
