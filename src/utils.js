const ENDPOINTS = ["sum", "find"];

const sumOfBalances = (balances) => {
  const sum = balances.reduce((prev, current) => {
    return prev + current.balance;
  }, 0);
  return sum;
};

const highestBalance = (balances) => {
  const max = balances.reduce((prev, current) => {
    return prev.balance > current.balance ? prev.address : current.address;
  });

  return max;
};

const lowestBalance = (balances) => {
  const min = balances.reduce((prev, current) => {
    return prev.balance < current.balance ? prev.address : current.address;
  });

  return min;
};

const isValidEndpoint = (endpoint) => {
  return ENDPOINTS.includes(endpoint);
};

module.exports = {
  sumOfBalances,
  highestBalance,
  lowestBalance,
  isValidEndpoint,
};
