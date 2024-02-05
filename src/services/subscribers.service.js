const { Subscribers } = require("../models/Subscribers");
const BasicServices = require("./basic.service");
class SubscriberServices extends BasicServices {
  constructor() {
    super(Subscribers);
  }
}

module.exports.SubscriberServices = new SubscriberServices();
