import Transaction from '../models/Transaction';
import path from 'path';
import fs from 'fs';
import csvParser, { CsvParser } from 'csv-parser';
import CreateTransactionService from '../services/CreateTransactionService';
import LoadCsvFileService from './LoadCsvFileService';
import express from 'express';
import database from '../database';

interface ResponseTransaction {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

export default class ImportTransactionsService {
  async execute(csvFile: Express.Multer.File): Promise<Transaction[]> {
    const createTransactionService = new CreateTransactionService();
    const loadCsvFileService = new LoadCsvFileService();
    const loadTransactions: Transaction[] = await loadCsvFileService.execute(
      csvFile,
    );

    const transactions = loadTransactions.forEach(async transaction => {
      await createTransactionService.execute({
        title: transaction.title,
        value: transaction.value,
        type: transaction.type,
        category: transaction.category,
      });
    });

    const pathMyCsv = path.resolve(
      __dirname,
      '..',
      '..',
      'tmp',
      csvFile.filename,
    );
  }
}
