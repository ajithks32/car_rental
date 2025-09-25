// rabbit.js
const amqp = require("amqplib");

let channel, connection;
const queue = "email_queue";

async function connectRabbit() {
  connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();
  await channel.assertQueue(queue);
  console.log("RabbitMQ connected, queue asserted");
}

function publishToQueue(data) {
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
}

module.exports = { connectRabbit, publishToQueue };
