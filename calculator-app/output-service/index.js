const express = require('express');
const bodyParser = require('body-parser');

const { kafka } = require("./client");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const port = 9001;

const producer = kafka.producer();
const groupId = "calculator-output-1";

let response;

async function consumerInit() {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();

  await consumer.subscribe({ topics: ["add","sub","mul","div"], fromBeginning: false });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      const data = JSON.parse(message.value.toString());

      const num1 = data.num1;
      const num2 = data.num2;

      switch (topic) {
        case "add": {response = {"Latest addition calculation : " : Number(num1)+Number(num2)};}
          break;
        case "sub": {response = {"Latest Subtraction calculation : " : Number(num1)-Number(num2)};}
          break;
        case "mul": {response = {"Latest multiplication calculation : " : Number(num1)*Number(num2)};}
          break;
        case "div": {response = {"Latest division calculation : " : Number(num1)/Number(num2)};}
          break;
      }

      console.log(
        `${groupId}: [${topic}]: PART:${partition}:`,
        data,
        response
      );
    },
  });

}

consumerInit();

app.get('/', async function(req, res){res.send(response)});

app.get('/kill', (req, res) => {
    res.send("Force Killing"); server.close(async (err) => {
    await producer.disconnect();
    console.log('Force Killing, Http server closed.');
    process.exit(err ? 1 : 0);
  })});

// start the server
const server = app.listen(port);
console.log('Server started! At http://localhost:' + port);

process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    await producer.disconnect();
    
    server.close((err) => {
      console.log('Http server closed.');
      process.exit(err ? 1 : 0);
    });
  });