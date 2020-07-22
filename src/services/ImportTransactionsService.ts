import Transaction from '../models/Transaction';
import path from 'path';
import fs from 'fs';
import csvParser from 'csv-parser';
import express from 'express';

export default class ImportTransactionsService {
  async execute(csvFile: Express.Multer.File): Promise<void> {
    const pathMyCsv = path.resolve(
      __dirname,
      '..',
      '..',
      'tmp',
      csvFile.filename,
    );

    fs.createReadStream(pathMyCsv)
      .pipe(csvParser())
      .on('data', data => {
        const formatData = data;
        console.log(`${data.title}`);
      });
  }
}
