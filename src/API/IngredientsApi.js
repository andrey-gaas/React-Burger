import { INGREDIENTS_LIST_URL } from '../constants/api';
import checkResponse from '../utils/checkResponse';

class IngredientsApi {
  static async fetchIngredientsList() {
    let result = await fetch(INGREDIENTS_LIST_URL);
    result = await checkResponse(result);
    return result;
  }
}

export default IngredientsApi;
