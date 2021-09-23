export type Cat = Readonly<{
  id: string;
  name: string;
}>;

export type CatList = ReadonlyArray<Cat>;

export type PageMetadata = Readonly<{
  hasNextPage: boolean;
}>;

export type PagedResult = Readonly<{
  results: CatList;
  metadata: PageMetadata;
}>;

export type CatMetaData = Readonly<{
  id: string;
  name: string;
  cTime: string;
  mTime: string;
}>;

export type ResultCount = Readonly<{
  count: number
}>;

export type UnsavedCat = Readonly<{
  name: string;
}>;

