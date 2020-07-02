import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import transactionsRouter from '../routes/transactions.routes';
import CategoryService from './CreateCategoryService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);
    const categoryService = new CategoryService();
    /**
     * Recupera o id da categoria
     */
    const { id } = await categoryService.execute(category);
    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: id,
    });
    await transactionRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
