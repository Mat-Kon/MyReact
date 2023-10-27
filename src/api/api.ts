import { ICategory, Item } from '../types/types';

class Api {
  private apiUrl: string = 'https://swapi.dev/api/people';

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

  private getItemsFromCategories = async (data: ICategory): Promise<Item[]> => {
    const items: Item[] = [];
    items.push(...data.results);
    let nextPage = data.next;
    while (nextPage) {
      try {
        const item = await this.getItemsFromCategory(nextPage);
        if (item) {
          items.push(...item.items);
          nextPage = item.url.next;
        }
      } catch {
        console.error('Error in getItems');
      }
    }
    return items;
  };

  public getItems = async (page: number): Promise<Item[]> => {
    try {
      const resp = await fetch(`${this.apiUrl}/?page=${page}`);
      const data: ICategory = await resp.json();
      const result: Item[] = data.results;
      return result;
    } catch {
      throw new Error(`Error in getAll`);
    }
  };

  public getSearchItems = async (value: string): Promise<Item[]> => {
    try {
      const searchValue: string = value.trim();
      const resp = await fetch(`${this.apiUrl}/?search=${searchValue}`);
      const data: ICategory = await resp.json();
      console.log(data);
      const items: Promise<Item[]> = this.getItemsFromCategories(data);
      return items;
    } catch {
      throw new Error(`Error in getAll`);
    }
  };
}

export { Api };
