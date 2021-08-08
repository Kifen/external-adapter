const ENDPOINTS = ["sum", "query-balances"];

const sumOfBalances = (balances) => {
  const sum = balances.reduce((prev, current) => {
    return prev + current.balance;
  }, 0);
  return sum;
};

const highestBalance = (balances) => {
  const sortedBalances = balances.sort(dynamicSort("balance"));
  return sortedBalances[sortedBalances.length - 1];
};

const lowestBalance = (balances) => {
  const sortedBalances = balances.sort(dynamicSort("balance"));
  return sortedBalances[0];
};

const dynamicSort = (property) => {
  return function (a, b) {
    if (a[property] < b[property]) {
      return -1;
    } else if (a[property] > b[property]) {
      return 1;
    }
    return 0;
  };
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
