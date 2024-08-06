let accounts = {};

let id_counter = 0;

function resetAccounts() {
  accounts = {};
}

function getAccountBalance(account_id) {
  return accounts[account_id]?.balance;
}

function createAccount(type, destination, amount) {
  const _ = Object.keys().includes(id_counter + 1);
  return accounts[]
}

module.exports = { resetAccounts, getAccountBalance };
