const denominations = [
  {name: 'ONE-HUNDRED',  value: 100},
  {name: 'THIRTY-THREE', value: 33},
  {name: 'TWENTY-ONE', value: 21},
  {name: 'SEVEN', value: 7},
  {name: 'THREE', value: 3},
  {name: 'ONE', value: 1}
];

const calculateChange = (bill, payment) => {
  if (payment < bill) return -1;

  if (payment === bill) return 0;

  let change = payment - bill;

  const ccToReturn = [];

  denominations.forEach(d => {
    if (d.value <= change) {
      const leftover = change % d.value;
      const ccAmount = (change - leftover) / d.value;
      ccToReturn.push({ ccAmount, ccValue: d.value });
      change = leftover;
    }
  });

  return ccToReturn;
};

module.exports = {
  calculateChange
}