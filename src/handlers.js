let accounts = {};

const notFoundResponse = {
  body: 0,
  status: 404,
};

function resetAccounts() {
  accounts = {};
}

function getAccountBalance(account_id) {
  return accounts[account_id]?.balance;
}

function transfer({ origin, destination, amount }) {
  if (accounts[origin] && accounts[destination]) {
    const origin = accounts[origin];
    const destination = accounts[destination];
    origin.balance = origin.balance - amount;
    destination.balance = destination.balance + amount;
    return {
      origin: { id: origin, balance: accounts[origin].balance },
      destination: {
        id: destination,
        balance: accounts[destination].balance,
      },
    };
  } else {
    return notFoundResponse;
  }
}

function deposit({ destination, amount }) {
  if (accounts[destination]) {
    const currAmount = accounts[destination].amount;
    accounts[destination] = { amount: currAmount + amount };
  } else {
    accounts[destination] = { amount, type };
  }
  return {
    body: {
      destination: {
        id: destination,
        balance: accounts[destination].balance,
      },
    },
    status: 201,
  };
}

function withdraw({ origin, amount }) {
  const currAmount = accounts[origin].amount;
  if (accounts[origin]) {
    accounts[origin] = { amount: currAmount - amount };
    return {
      body: {
        origin: {
          id: origin,
          balance: accounts[origin].balance,
        },
      },
      status: 201,
    };
  } else {
    return notFoundResponse;
  }
}

function createOrUpdateAccount({ type, origin, destination, amount }) {
  if (type === "deposit") {
    return deposit({ destination, amount });
  } else if (type === "withdraw") {
    return withdraw({ origin, amount });
  } else {
    return transfer({ origin, destination, amount });
  }
}

module.exports = { resetAccounts, getAccountBalance, createOrUpdateAccount };
