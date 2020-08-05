import { getRepository } from 'typeorm';
import Category from '../models/Category';
import AppError from '../errors/AppError';

export default class CreateCategoryService {
  public async execute(category: string): Promise<Category> {
    const categoryRepository = getRepository(Category);
    const checkCategoryExists = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    /**
     * Caso exista, a categoria a aplicação devolve a categoria e não cria uma nova
     * Caso não exista, cria uma nova e devolve
     */
    if (!checkCategoryExists) {
      const categoryCreated = categoryRepository.create({ title: category });
      await categoryRepository.save(categoryCreated);
      console.log(`${categoryCreated} categoria criada`);
      return categoryCreated;
    }
    return checkCategoryExists;
  }
}
