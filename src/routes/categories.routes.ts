import { Router } from 'express';
import CreateCategoryService from '../services/CreateCategoryService';

const categories = Router();

const createCategoryService = new CreateCategoryService();

categories.post('/', async (request, response) => {
  const { title } = request.body;
  const category = await createCategoryService.execute(title);
  return response.json(category);
});
export default categories;
