import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface AllTransactions {
  transaction: Transaction[];
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const balance = transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        if (transaction.type === 'income') {
          accumulator.income += transaction.value;
        }
        if (transaction.type === 'outcome') {
          accumulator.outcome += transaction.value;
        }
        const total = accumulator.income - accumulator.outcome;
        accumulator.total = total;
        return accumulator;
      },
      { income: 0, outcome: 0, total: 0 },
    );
    return balance;
  }
}

export default TransactionsRepository;
