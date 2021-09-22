import axios from "axios";
import {
  CatList,
  CatMetaData,
  UnsavedCat,
  ResultCount
} from "../types";
import { deepCamelCaseKeys, deepSnakeCaseKeys } from "../utils/objectUtils";

const getAllCats = async (url: string): Promise<CatList> => {
  const { data } = await axios.get(url);
  const list = deepCamelCaseKeys(data.results);
  return list;
};

const getCatbyId = async (catId: string): Promise<CatMetaData> => {
  const { data } = await axios.get("http://localhost:10000/v1/cats/" + catId);
  const list = deepCamelCaseKeys(data);
  return list;
};

const createCat = async (cat_data: UnsavedCat): Promise<CatMetaData> => {
  const payload = deepSnakeCaseKeys(cat_data);
  const { data } = await axios.post("http://localhost:10000/v1/cats", payload);
  const list = deepCamelCaseKeys(data);
  return list;
};

const deleteCat = async (catId: string): Promise<ResultCount> => {
  const { data } = await axios.delete("http://localhost:10000/v1/cats/" + catId);
  const list = deepCamelCaseKeys(data);
  return list;
};

const getCatsCount = async (): Promise<number> => {
  const { data } = await axios.get("http://localhost:10000/v1/cat/count");
  return data;
};

export default {
  getAllCats,
  getCatbyId,
  createCat,
  deleteCat,
  getCatsCount,
};
