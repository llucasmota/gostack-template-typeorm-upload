import path from 'path';
import fs from 'fs';
import csvParse from 'csv-parse';
import csvParser from 'csv-parser';
import csv from 'csvtojson';
import uploadConfig from '../config/uploadConfig';
import parse from 'csv-parse';
import Transaction from '../models/Transaction';

export default class LoadCsvFileService {
  async execute(csvPath: Express.Multer.File): Promise<Transaction[]> {
    const csvFilePath = path.resolve(uploadConfig.directory, csvPath.filename);
    const myCsv = await csv().fromFile(csvFilePath);
    console.log(myCsv);

    return myCsv;
  }
}
