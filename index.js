const user = {
  name: "Mango",
  age: 20,
  hobby: "html",
  premium: true,
};

user.mood = "happy";
user.hobby = "skydiving";
user.premium = false;

const { name, age, hobby, premium, mood } = user;

console.log(`name: ${name}`);
console.log(`age: ${age}`);
console.log(`hobby: ${hobby}`);
console.log(`premium: ${premium}`);
console.log(`mood: ${mood}`);

function countProps(obj) {
  const { ...props } = obj;
  return Object.keys(props).length;
}

function findBestEmployee(employees) {
  let bestEmployee = "";
  let maxTasks = 0;

  for (const [employee, tasks] of Object.entries(employees)) {
    if (tasks > maxTasks) {
      maxTasks = tasks;
      bestEmployee = employee;
    }
  }

  return bestEmployee;
}

function countTotalSalary(employees) {
  let totalSalary = 0;

  for (const [, salary] of Object.entries(employees)) {
    totalSalary += salary;
  }

  return totalSalary;
}

function getAllPropValues(arr, prop) {
  const values = [];

  for (const { [prop]: value } of arr) {
    if (value !== undefined) {
      values.push(value);
    }
  }

  return values;
}

function calculateTotalPrice(allProducts, productName) {
  for (const { name, price, quantity } of allProducts) {
    if (name === productName) {
      return price * quantity;
    }
  }

  return 0;
}

console.log(
  "Кількість властивостей:",
  countProps({ name: "Mango", age: 2, hobby: "html" }),
);

console.log(
  "Найкращий працівник:",
  findBestEmployee({
    poly: 12,
    mango: 17,
    ajax: 4,
  }),
);

console.log(
  "Загальна зарплата:",
  countTotalSalary({
    mango: 100,
    poly: 150,
    alfred: 80,
  }),
);

console.log(
  "Значення властивості:",
  getAllPropValues(
    [
      { name: "Apple", price: 30 },
      { name: "Lemon", price: 20 },
      { name: "Orange", price: 40 },
    ],
    "name",
  ),
);

console.log(
  "Загальна вартість продукту:",
  calculateTotalPrice(
    [
      { name: "Apple", price: 30, quantity: 3 },
      { name: "Lemon", price: 20, quantity: 5 },
      { name: "Orange", price: 40, quantity: 2 },
    ],
    "Lemon",
  ),
);

const Transaction = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
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
      console.log("Зняття такої суми неможливе, недостатньо коштів.");
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

console.log("Поточний баланс:", account.getBalance());
console.log("Деталі транзакції з id 2:", account.getTransactionDetails(2));
console.log(
  "Загальна сума поповнень:",
  account.getTransactionTotal(Transaction.DEPOSIT),
);
console.log(
  "Загальна сума зняття:",
  account.getTransactionTotal(Transaction.WITHDRAW),
);
console.log("Історія транзакцій:", account.transactions);
