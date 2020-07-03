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
interface ResponseTransaction {
  id: string;
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
  }: Request): Promise<ResponseTransaction> {
    if (!['income', 'outcome'].includes(type)) {
      throw new AppError('Tipo não permitido', 400);
    }

    const transactionRepository = getRepository(Transaction);
    const categoryService = new CategoryService();
    /**
     * Recupera o id da categoria
     */
    const categoryResponse = await categoryService.execute(category);
    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: categoryResponse.id,
    });

    await transactionRepository.save(transaction);
    const responseTransaction = {
      id: transaction.id,
      title: transaction.title,
      value: transaction.value,
      type: transaction.type,
      category: categoryResponse.title,
    };
    return responseTransaction;
  }
}

export default CreateTransactionService;
