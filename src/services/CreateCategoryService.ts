import { getRepository } from 'typeorm';
import Category from '../models/Category';
import AppError from '../errors/AppError';

export default class CreateCategoryService {
  public async execute(title: string): Promise<Category> {
    const categoryRepository = getRepository(Category);
    const checkCategoryExists = await categoryRepository.findOne({
      where: {
        title,
      },
    });
    /**
     * Caso exista, a categoria a aplicação devolve a categoria e não cria uma nova
     * Caso não exista, cria uma nova e devolve
     */
    if (!checkCategoryExists) {
      const category = categoryRepository.create({ title });
      await categoryRepository.save(category);

      return category;
    }
    return checkCategoryExists;
  }
}
