import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getRepository(Transaction);
    const transaction = await transactionRepository.findOne({
      where: { id },
    });
    if (!transaction) {
      throw new AppError('Transação inexistente', 400);
    }
    await transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
