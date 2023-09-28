import { Category, ICategories, ICategory, IPeople } from '../types/types';

class Api {
  private apiUrl: string = 'https://swapi.dev/api/?format=json';
  private response: Promise<Response>;

  constructor() {
    this.response = fetch(this.apiUrl);
  }

  public async getAll() {
    try {
      const resp = await this.response;
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ICategories = await resp.json();
      const categories: string[] = Object.keys(data);
      const result = await Promise.all(
        categories.map(async (category) => {
          const newResp = await fetch(data[category as Category]);
          const newData: ICategory = await newResp.json();
          const resultsData: IPeople[] = newData.results;
          return resultsData;
        })
      );
      return result;
    } catch (error) {
      throw new Error(`Error in getAll: ${error}`);
    }
  }

  public async getCategory(category: Category): Promise<void | ICategory> {
    try {
      const response = await this.response;
      if (response.ok) {
        const data: ICategories = await response.json();
        console.log(data, category);
        if (data[category]) {
          const newUrl = data[category];
          const newResponse = await fetch(newUrl);
          const newData = await newResponse.json();
          console.log(newData);
        }
      }
      throw new Error(`Network response was not ok, status is ${response.status}`);
    } catch (error) {
      throw new Error(`Error in getCategory ${error}`);
    }
  }
}

export { Api };
