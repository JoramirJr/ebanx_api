let accounts = {};

const notFoundResponse = {
  body: "0",
  status: 404,
};

function resetAccounts() {
  accounts = {};
}

function getAccountBalance(account_id) {
  return accounts[account_id]?.balance;
}

function transfer({ origin, destination, amount }) {
  if (accounts[origin]) {
    const originAcc = accounts[origin];
    const destinationAcc = accounts[destination] ?? { balance: 0 };

    originAcc.balance = originAcc.balance - amount;
    destinationAcc.balance = destinationAcc.balance + amount;
    return {
      body: {
        origin: { id: origin, balance: originAcc.balance },
        destination: {
          id: destination,
          balance: destinationAcc.balance,
        },
      },
      status: 201,
    };
  } else {
    return notFoundResponse;
  }
}

function deposit({ destination, amount }) {
  if (accounts[destination]) {
    const currAmount = accounts[destination].balance;
    accounts[destination] = { balance: currAmount + amount };
  } else {
    accounts[destination] = { balance: amount };
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
  if (accounts[origin]) {
    const currAmount = accounts[origin].balance;
    accounts[origin] = { balance: currAmount - amount };
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
