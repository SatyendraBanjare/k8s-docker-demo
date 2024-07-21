const express = require('express');
const bodyParser = require('body-parser');

const { kafka } = require("./client");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const port = 9000;

const producer = kafka.producer();

app.post('/input/', async function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    const op = req.body.op;
    const num1 = req.body.num1;
    const num2 = req.body.num2;
    const data = JSON.stringify({ "timestamp": Date.now(),op, num1,num2 });


    await producer.connect();
    await producer.send({
        topic: op,
        messages: [
          {
            partition: 0,
            key: "New Input",
            value: data,
          },
        ],
      });
    res.send(data);
});

app.get('/kill', (req, res) => {
    res.send("Force Killing"); server.close((err) => {
    console.log('Http server closed.');
    process.exit(err ? 1 : 0);
  })});

// start the server
const server = app.listen(port);
console.log('Server started! At http://localhost:' + port);

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close((err) => {
      console.log('Http server closed.');
      process.exit(err ? 1 : 0);
    });
  });