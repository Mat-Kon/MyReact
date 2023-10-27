type Items = IPeople[];

type ItemBlockListProps = {
  items: Items | null;
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

export type { ICategory, IPeople, ItemBlockListProps, ItemBlockListState, Items, Result };
