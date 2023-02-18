import { BASE_URL } from "../constants/api";
import checkResponse from "./checkResponse";

async function request(endpoint, params = {}) {
  let result = await fetch(BASE_URL + endpoint, params);
  result = await checkResponse(result);
  return result;
}

export default request;
