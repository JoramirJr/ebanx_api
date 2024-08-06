let accounts = {};

let id_counter = 0;

function resetAccounts() {
  accounts = {};
}

function getAccountBalance(account_id) {
  return accounts[account_id]?.balance;
}

function createOrUpdateAccount(type, destination, amount) {
  if (accounts[destination]) {
    const currAmount = accounts[destination].amount;
    if (type === "deposit") {
      accounts[destination] = { amount: currAmount + amount };
    } else if (type === "withdraw") {
      accounts[destination] = { amount: currAmount - amount };
    }
  } else {
    if (type === "deposit") {
      accounts[destination] = { amount, type };
    } else if (type === "withdraw"){
      return;
    }
  }
  return {
    destination: { id: destination, balance: accounts[destination].balance },
  };
}

module.exports = { resetAccounts, getAccountBalance, createOrUpdateAccount };
