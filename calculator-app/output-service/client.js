const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: process.env["KAFKA_CLIENT_ID"] || "input-service" ,
  brokers: [`${process.env["BOOTSTRAP_SERVERS"]}`]|| ["kafka:9095"],
});
