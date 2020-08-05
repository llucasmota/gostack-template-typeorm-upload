import path from 'path';
import fs from 'fs';
import csvParse from 'csv-parse';
import csvParser from 'csv-parser';
import csv from 'csvtojson';
import uploadConfig from '../config/uploadConfig';
import parse from 'csv-parse';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

export default class LoadCsvFileService {
  async execute(csvPath: string): Promise<Request[]> {
    const csvFilePath = path.resolve(uploadConfig.directory, csvPath);
    const myCsv = await csv().fromFile(csvFilePath);
    return myCsv;
  }
}
