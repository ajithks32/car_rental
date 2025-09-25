const amqp = require("amqplib");
const nodemailer = require("nodemailer");

const queue = "email_queue";

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  console.log("Worker waiting for messages...");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "ajith1711399535@gmail.com",
      pass: "qanx aibd wqty oyfa",
    },
  });

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const { emails, message } = JSON.parse(msg.content.toString());
      console.log("Received email job:", emails);

      // Send emails
      for (const email of emails) {
        await transporter.sendMail({
          from: '"Car Rental Booking" <no-reply@yourapp.com>',
          to: email,
          subject: "Update Alert",
          text: message,
        });
      }

      channel.ack(msg);
    }
  });
})();
