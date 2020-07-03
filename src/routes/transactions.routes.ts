import { Router, Response, Request } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';
import CreateTransactionService from '../services/CreateTransactionService';
const transactionsRouter = Router();

transactionsRouter.get('/', async (request: Request, response: Response) => {
  return response.json({ message: 'olá' });
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

  return response.json({
    id: transaction.id,
    title: transaction.title,
    value: transaction.value,
    type: transaction.type,
    category: transaction.category,
  });
});

transactionsRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const deleteTransactionService = new DeleteTransactionService();
    const transactionDelete = await deleteTransactionService.execute(id);

    return response.status(204).send();
  },
);

transactionsRouter.post(
  '/import',
  async (request: Request, response: Response) => {
    // TODO
  },
);

export default transactionsRouter;
