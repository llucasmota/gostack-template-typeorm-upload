import express, { Router, Response, Request } from 'express';

import multer from 'multer';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ReturnTransactionService from '../services/ReturnTransactionsBalanceService';
import ImportTransactionsService from '../services/ImportTransactionsService';
import LoadCsvFileService from '../services/LoadCsvFileService';
import CreateTransactionService from '../services/CreateTransactionService';
import multerConfig from '../config/uploadConfig';

const transactionsRouter = Router();
const upload = multer(multerConfig);

transactionsRouter.get('/', async (request: Request, response: Response) => {
  const returnTransactionsBalanceService = new ReturnTransactionService();
  const transactionsAndBalance = await returnTransactionsBalanceService.execute();
  return response.json(transactionsAndBalance);
});

transactionsRouter.post('/', async (request: Request, response: Response) => {
  // TODO
  const { title, value, type, category } = request.body;
  const createTransactionService = new CreateTransactionService();
  const transaction = await createTransactionService.execute({
    title,
    value,
    type,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const deleteTransactionService = new DeleteTransactionService();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const transactionDelete = await deleteTransactionService.execute(id);

    return response.status(204).send();
  },
);

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request: Request, response: Response) => {
    const importTransactionsService = new ImportTransactionsService();
    const csvImport = await importTransactionsService.execute(
      request.file.filename,
    );

    return response.json(csvImport);
  },
);

export default transactionsRouter;
