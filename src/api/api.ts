import { hiddenLoader, viewLoader } from '../components/Loader';
import { Category, ICategories, ICategory, ItemBlockList } from '../types/types';

class Api {
  private apiUrl: string = 'https://swapi.dev/api/?format=json';
  private response: Promise<Response>;

  constructor() {
    this.response = fetch(this.apiUrl);
  }

  public async getAll(): Promise<ItemBlockList> {
    try {
      const resp = await this.response;
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      viewLoader();
      const data: ICategories = await resp.json();
      const categories: string[] = Object.keys(data);
      const allItems: ItemBlockList = [];
      for (const category of categories) {
        let nextPage: string = data[category as Category];

        while (nextPage) {
          const newResp = await fetch(nextPage);
          const newData: ICategory = await newResp.json();
          const resultsData: ItemBlockList = newData.results;
          allItems.push(...resultsData);
          nextPage = newData.next;
        }
      }
      return allItems;
    } catch (error) {
      throw new Error(`Error in getAll: ${error}`);
    } finally {
      hiddenLoader();
    }
  }

  public async getCategory(category: Category): Promise<ItemBlockList> {
    try {
      viewLoader();
      const response = await this.response;
      if (!response.ok) {
        throw new Error(`Network response was not ok, status is ${response.status}`);
      }
      const data: ICategories = await response.json();
      const allItems: ItemBlockList = [];

      if (data[category]) {
        let newUrl: string = data[category];

        while (newUrl) {
          const newResponse = await fetch(newUrl);
          const newData: ICategory = await newResponse.json();
          const results: ItemBlockList = newData.results;
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
