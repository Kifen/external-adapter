const sumOfBalances = (balances) => {
  return balances.reduce((a, b) => a + b);
};

const highestBalance = (balances) => {
  const max = balances.reduce((prev, current) => {
    return prev.balance > current.balance ? prev.address : current.address;
  });
};

const lowestBalance = (balances) => {
  const max = balances.reduce((prev, current) => {
    return prev.balance < current.balance ? prev.address : current.address;
  });
};

module.exports = {
  sumOfBalances,
  highestBalance,
  lowestBalance,
};
