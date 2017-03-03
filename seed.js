let ibmStock = new Stock({
  stockName: 'International Business Machines',
  stockTicker: 'IBM',
});

let appleStock = new Stock({
  stockName: 'Apple',
  stockTicker: 'AAPL'
});

ibmStock.save((err, data) => {
  if(err)
    console.log(err);
  else
    console.log('Saved : ', data);
}).then(() => {
  appleStock.save((err, data) => {
  if(err)
    console.log(err);
  else
    console.log('Saved : ', data);
  })
});
