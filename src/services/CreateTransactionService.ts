import AppError from '../errors/AppError';
import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
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
  type: 'income' | 'outcome';
  value: number;
  created_at: Date;
  updated_at: Date;
  category: Category;
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
      category: categoryResponse,
    });

    await transactionRepository.save(transaction);

    return {
      id: transaction.id,
      title: transaction.title,
      type: transaction.type,
      value: transaction.value,
      created_at: transaction.created_at,
      updated_at: transaction.updated_at,
      category: categoryResponse,
    };
  }
}
