export type Cat = Readonly<{
  id: string;
  name: string;
  url: string | null;
}>;

export type CatList = ReadonlyArray<Cat>;

export type PageMetadata = Readonly<{
  hasNextPage: boolean;
}>;

export type PagedResult<T> = Readonly<{
  results: T;
  metadata: PageMetadata;
}>;

export type CatMetaData = Readonly<{
  id: string;
  name: string;
  ctime: string;
  mtime: string;
}>;

export type ResultCount = Readonly<{
  count: number
}>;

export type UnsavedCat = Readonly<{
  name: string;
}>;

