import axios from "axios";
import { getParameter } from "../utils/apiUtils.js";

const url = "https://noteb.com/api/webservice.php";
const headers = {
  "Content-Type": "multipart/form-data",
}

const getData = async (object) => {
  const parameter = getParameter(object);
  const data = await axios.post(url, parameter, { headers })
    .then(response => response.data)
    .catch(error => {
      // console.error('Error:', error);
    });
  return data;
}


export { getData };


// console.log(parameter);