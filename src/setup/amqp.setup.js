const amqp = require("amqplib");

class Amqp {
  constructor(channel, connection, link) {
    this.channel = channel;
    this.connection = connection;
    this.link = link;
  }
  connectQueue = async () => {
    try {
      this.connection = await amqp.connect(this.link || "amqp://rabbitmq:15672");
      this.channel = await connection.createChannel();
      await channel.assertQueue("test-queue");
    } catch (error) {
      console.log(error);
    }
  };
  sendDataToQueue = async (queue, data) => {
    try {
      await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    } catch (error) {
      console.log(error);
    }
  };
  disconnectQueue = async () => {
    try {
      // close the channel and connection
      await this.channel.close();
      await this.connection.close();
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports.RabbitMQ = Amqp;
