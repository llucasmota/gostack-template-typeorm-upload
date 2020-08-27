import AppError from '../errors/AppError';
import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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

export default class ReturnTransactionsService {
  public async execute(): Promise<{
    transactions: ResponseTransaction[];
    balance: Balance;
  }> {
    const categoryRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const balance = await transactionRepository.getBalance();
    const transactions = await transactionRepository.find({
      relations: ['category'],
    });
    const transactionsWithCategory = {};

    return { transactions, balance };
  }
}
