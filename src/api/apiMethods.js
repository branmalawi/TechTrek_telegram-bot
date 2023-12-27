import { getData } from "./apiConnection.js";
import { searchResultFilter } from "../utils/apiUtils.js";

export const api_search = async (keyword, page = 1) => {
  const paramObject = {
    method: "list_models",
    "param[model_name]": keyword,
  }

  const raw_data = await getData(paramObject);
  // console.log(raw_data.result);
  const filtered_data = searchResultFilter(raw_data.result, page)
  return filtered_data;
}

// api_search("tuf", 1);