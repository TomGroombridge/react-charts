export const thisWeek = () => {
  return new Date(getMonday(new Date())) as any;
};

export const twoWeeksAgo = () => {
  return new Date(getMonday(thisWeek() - 7 * 24 * 60 * 60 * 1000));
};

export const threeWeeksAgo = () => {
  return new Date(getMonday(thisWeek() - 14 * 24 * 60 * 60 * 1000));
};

const getMonday = (date: any) => {
  let d = new Date(date);
  var day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff)).setHours(0, 0, 0, 0);
};

export const splitTransactions = (data: any) => {
  const weekOne = data.results.filter((transaction: any) => {
    return (
      transaction.transaction_type === 'DEBIT' &&
      new Date(transaction.timestamp) >= thisWeek()
    );
  });

  const weekTwo = data.results.filter((transaction: any) => {
    return (
      transaction.transaction_type === 'DEBIT' &&
      new Date(transaction.timestamp) < thisWeek() &&
      new Date(transaction.timestamp) >= twoWeeksAgo()
    );
  });

  const weekThree = data.results.filter((transaction: any) => {
    return (
      transaction.transaction_type === 'DEBIT' &&
      new Date(transaction.timestamp) < twoWeeksAgo() &&
      new Date(transaction.timestamp) >= threeWeeksAgo()
    );
  });

  return [weekOne, weekTwo, weekThree];
};

export const netSpend = (transactions: any) => {
  const total = transactions.reduce(function(prev: any, cur: any) {
    return prev + Math.abs(cur.amount);
  }, 0);

  return total;
};
