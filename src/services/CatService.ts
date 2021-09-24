import axios from "axios";
import {
  PagedResult,
  CatMetaData,
  CatList,
  UnsavedCat,
  ResultCount
} from "../types";
import { deepCamelCaseKeys, deepSnakeCaseKeys } from "../utils/objectUtils";
import { BASE_URL } from "../constants";

const getAllCats = async ({
  pageNumber,
  pageSize,
  sortBy,
}: {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
}): Promise<PagedResult<CatList>> => {
  const url = `${BASE_URL}?sort_by=${sortBy}&page_number=${pageNumber}&page_size=${pageSize}`
  const { data } = await axios.get(url);
  const list = deepCamelCaseKeys(data);
  return list;
};

const getCatbyId = async (catId: string): Promise<CatMetaData> => {
  const { data } = await axios.get(`${BASE_URL}/${catId}`);
  const list = deepCamelCaseKeys(data);
  return list;
};

const createCat = async (cat_data: UnsavedCat): Promise<CatMetaData> => {
  const payload = deepSnakeCaseKeys(cat_data);
  const { data } = await axios.post(BASE_URL, payload);
  const list = deepCamelCaseKeys(data);
  return list;
};

const deleteCat = async (catId: string): Promise<ResultCount> => {
  const { data } = await axios.delete(`${BASE_URL}/${catId}`);
  const list = deepCamelCaseKeys(data);
  return list;
};

export default {
  getAllCats,
  getCatbyId,
  createCat,
  deleteCat,
};
