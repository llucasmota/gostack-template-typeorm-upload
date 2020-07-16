import { Router, Response, Request } from 'express';

import multer from 'multer';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ReturnTransactionService from '../services/ReturnTransactionsBalanceService';
// import ImportTransactionsService from '../services/ImportTransactionsService';
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const transactionDelete = await deleteTransactionService.execute(id);

    return response.status(204).send();
  },
);

transactionsRouter.post(
  '/import',
  upload.single('transaction'),
  async (request: Request, response: Response) => {
    console.log(request.file);

    return response.json({ message: 'olá' });
  },
);

export default transactionsRouter;
