
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
 
let apiLabels = [0];
let apiDataChaos = [10];
let apiDataExalts = [40];

var chaosOrb = {
  name: "chaos",
  rate: 1.001,
  variance: 0.1,
  startingPoint: 20,
};
var exaltedOrb = {
  name: "exalts",
  rate: 1.001,
  variance: 0.3,
  startingPoint: 40,
};

io.origins('*:*');
io.on("connection", socket => {
    console.log("user connected");
})

 
    
const randomAroundZero = () => {
    return Math.random() > 0.5 ? 1 : -1;
}

const getStockPrice = (input) => {
    let start = input.startingPoint;
    let rate = input.rate;
    let variance = input.variance;

    return start * rate + variance * randomAroundZero();
}
    
setInterval(() => {
  let newLabel = apiLabels[apiLabels.length - 1] + 5;    
  apiLabels.push(newLabel);

  let newDataChaos = getStockPrice(chaosOrb)
  chaosOrb.startingPoint = newDataChaos;
  console.log(newDataChaos)
  apiDataChaos.push(newDataChaos)
  
  let newDataExalts = getStockPrice(exaltedOrb)
  exaltedOrb.startingPoint = newDataExalts;
  console.log(newDataExalts)
  apiDataExalts.push(newDataExalts)
 


  let dataset = [
      {
          labels: apiLabels,
          datasets: [
            {
              label: 'Chaos Orbs',
              backgroundColor: 'indigo',
              data: apiDataChaos
            }
          ]
      },
      {
          labels: apiLabels,
          datasets: [
            {
              label: 'Exalted Orbs',
              backgroundColor: '#d4af37',
              data: apiDataExalts
            }
          ]
        }
  ] 
  
  io.emit('ching', dataset);
}, 25);
 
setInterval(() => {
  apiLabels = apiLabels[apiLabels.length - 1];
  apiDataChaos = apiDataChaos[apiDataChaos.length - 1];
  apiDataExalts = apiDataExalts[apiDataExalts.length - 1];  
}, 600000);


server.listen(3000, () => {
    console.log("Listening to port 3k");
})
