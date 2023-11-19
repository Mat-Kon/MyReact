type Items = IPeople[];

type ItemBlockListState = {
  items: Items | null;
  isLoading: boolean;
};

type Result = {
  items: IPeople[];
  count: number;
};

interface IPeople {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: never[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface ICategory {
  count: number;
  next: string;
  previous: string;
  results: Items;
}

interface IContext {
  quantity: number;
}

interface ISearchValue {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>> | null;
}

interface ILoading {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>> | null;
}

interface IQuantity {
  setQuantity: React.Dispatch<React.SetStateAction<number>> | null;
}

export type {
  ICategory,
  IPeople,
  ItemBlockListState,
  Items,
  Result,
  IContext,
  ISearchValue,
  ILoading,
  IQuantity,
};
