import { BASE_URL } from "../constants/api";
import checkResponse from "./checkResponse";

async function request(endpoint: string, params = {}) {
  let result: Response = await fetch(BASE_URL + endpoint, params);
  result = await checkResponse<Response>(result);
  return result;
}

export default request;
