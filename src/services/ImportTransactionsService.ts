import path from 'path';
import TransactionRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import CreateCategoryService from './CreateCategoryService';
import { getCustomRepository, PromiseUtils } from 'typeorm';
import LoadCsvFileService from './LoadCsvFileService';
import AppError from '../errors/AppError';
import express, { response } from 'express';
import Transaction from '../models/Transaction';

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

export default class ImportTransactionsService {
  async execute(csvFile: string): Promise<Transaction[]> {
    const loadCsvFileService = new LoadCsvFileService();

    //retorna dados do csv em json
    const loadTransactions: Array<Request> = await loadCsvFileService.execute(
      csvFile,
    );

    //instancia de TransactionRepository
    const transactionRepository = getCustomRepository(TransactionRepository);
    //nova instancia de categoryService
    const categoryService = new CreateCategoryService();

    const createTransactionService = new CreateTransactionService();

    const executeTransactions = loadTransactions.map(async transaction => {
      return createTransactionService.execute(transaction);
    });
    console.log(`finished: ${executeTransactions}`);
    return await Promise.all(executeTransactions).then(transc => {
      return transc;
    });
  }
}
