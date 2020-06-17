import { Router, Response, Request } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';
import CreateTransactionService from '../services/CreateTransactionService';
const transactionsRouter = Router();

transactionsRouter.get('/', async (request: Request, response: Response) => {
  // TODO
});

transactionsRouter.post('/', async (request: Request, response: Response) => {
  // TODO
  const { title, value, type, category_id } = request.body;
  const createTransactionService = new CreateTransactionService();
  const transaction = await createTransactionService.execute({
    title,
    value,
    type,
    category_id,
  });

  return response.json({ transaction });
});

transactionsRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    // TODO
  },
);

transactionsRouter.post(
  '/import',
  async (request: Request, response: Response) => {
    // TODO
  },
);

export default transactionsRouter;
