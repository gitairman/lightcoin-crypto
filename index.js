let balance = 500.0;

class Account {
  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((a, c) => a + c.value, 0) || 0;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed())
      return console.log(
        `\nWithdrawal of $${this.amount} is not allowed as there is only $${this.account.balance} in your account!\n`
      );
    this.time = new Date();
    this.account.addTransaction(this);
  }
  isAllowed() {
    return this.value + this.account.balance >= 0;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

t3 = new Deposit(120.0, myAccount);
t3.commit();
console.log("Transaction 3:", t3);

console.log("Balance:", myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log("Transaction 1:", t1);

console.log("Balance:", myAccount.balance);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log("Transaction 2:", t2);

console.log("Balance:", myAccount.balance);

t4 = new Withdrawal(100, myAccount);
t4.commit();
console.log("Transaction 4:", t4);

console.log("Balance:", myAccount.balance);

t5 = new Withdrawal(59.76, myAccount);
t5.commit();
console.log("Transaction 5:", t5);

console.log("Balance:", myAccount.balance);
