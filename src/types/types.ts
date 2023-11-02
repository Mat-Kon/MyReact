type Items = IPeople[];

type ItemBlockListProps = {
  items: Items;
};

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
  species: [];
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
  results: IPeople[];
}

interface IContext {
  maxPage: number;
  setMaxPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ISearchValue {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>> | null;
}

export type {
  ICategory,
  IPeople,
  ItemBlockListProps,
  ItemBlockListState,
  Items,
  Result,
  IContext,
  ISearchValue,
};
