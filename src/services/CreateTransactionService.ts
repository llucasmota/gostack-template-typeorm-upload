import AppError from '../errors/AppError';
import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';
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

export default class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<ResponseTransaction> {
    if (!['income', 'outcome'].includes(type)) {
      throw new AppError('Tipo não permitido', 400);
    }

    const transactionRepository = getCustomRepository(TransactionRepository);
    const categoryService = new CategoryService();
    /**
     * Recupera o id da categoria
     */
    const categoryResponse = await categoryService.execute(category);
    const getMyBalance = await transactionRepository.getBalance();
    if (type === 'outcome') {
      const { total } = await transactionRepository.getBalance();
      if (total < value) {
        throw new AppError('Outcome value not allowed', 400);
      }
    }

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
