const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

const account = {
  balance: 0,
  transactions: [],
  nextId: 1,

  createTransaction(amount, type) {
    const { nextId } = this;

    const transaction = {
      id: nextId,
      type,
      amount,
    };

    this.nextId += 1;
    return transaction;
  },

  deposit(amount) {
    const transaction = this.createTransaction(amount, Transaction.DEPOSIT);
    this.balance += amount;
    this.transactions.push(transaction);
  },

  withdraw(amount) {
    const { balance } = this;

    if (amount > balance) {
      console.log('Зняття такої суми неможливе, недостатньо коштів.');
      return;
    }

    const transaction = this.createTransaction(amount, Transaction.WITHDRAW);
    this.balance -= amount;
    this.transactions.push(transaction);
  },

  getBalance() {
    return this.balance;
  },

  getTransactionDetails(id) {
    for (const transaction of this.transactions) {
      const { id: transactionId } = transaction;

      if (transactionId === id) {
        return transaction;
      }
    }

    return null;
  },

  getTransactionTotal(type) {
    let total = 0;

    for (const transaction of this.transactions) {
      const { type: transactionType, amount } = transaction;

      if (transactionType === type) {
        total += amount;
      }
    }

    return total;
  },
};

account.deposit(1000);
account.deposit(500);
account.withdraw(300);
account.withdraw(1500);

console.log('Поточний баланс:', account.getBalance());
console.log('Деталі транзакції з id 2:', account.getTransactionDetails(2));
console.log('Загальна сума поповнень:', account.getTransactionTotal(Transaction.DEPOSIT));
console.log('Загальна сума зняття:', account.getTransactionTotal(Transaction.WITHDRAW));
console.log('Історія транзакцій:', account.transactions);