import { Category, ICategories, ICategory } from '../types/types';

class Api {
  private apiUrl: string = 'https://swapi.dev/api/?format=json';
  private response: Promise<Response>;

  constructor() {
    this.response = fetch(this.apiUrl);
  }

  public getAllCategories(): Promise<string[]> {
    return this.response
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        const categories = Object.keys(data);
        return categories;
      });
  }

  getCategory(category: Category): Promise<void | ICategory> {
    return this.response
      .then((resp: Response) => {
        if (resp.ok) {
          return resp.json();
        }

        throw new Error(`Network response was not ok, status is ${resp.status}`);
      })
      .then(async (data: ICategories) => {
        const newUrl = data[category];
        const peopleResponse = await fetch(newUrl);
        if (peopleResponse.ok) {
          const category: ICategory = await peopleResponse.json();
          return category;
        }

        throw new Error(`Network response was not ok, status is ${peopleResponse.status}`);
      })
      .catch((err) => {
        console.error(`Method getCategory is error message ${err.message}`);
      });
  }
}

export { Api };
