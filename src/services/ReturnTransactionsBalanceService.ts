import AppError from '../errors/AppError';
import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export default class ReturnTransactionsService {
  public async execute(): Promise<{
    transactions: Transaction[];
    balance: Balance;
  }> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const balance = await transactionRepository.getBalance();
    const transactions = await transactionRepository.find();
    return { transactions, balance };
  }
}
