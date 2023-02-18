import request from '../utils/request';

class IngredientsApi {
  static async fetchIngredientsList() {
    return await request('/api/ingredients');
  }
}

export default IngredientsApi;
