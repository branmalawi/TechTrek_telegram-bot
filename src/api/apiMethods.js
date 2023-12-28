import { getData } from "./apiConnection.js";
import { searchResultFilter } from "../utils/apiUtils.js";

export const api_search = async (keyword, year, page = 1) => {
  const paramObject = {
    method: "list_models",
    "param[model_name]": keyword,
    "param[from_date]": year ? `${year}-01-01` : " ",
  }

  const raw_data = await getData(paramObject);
  const filtered_data = searchResultFilter(raw_data.result, page)
  return filtered_data;
}

// api_search("lenovo", 1);
