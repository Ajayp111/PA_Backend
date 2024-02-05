const { Subscription } = require("../models/Subscription.model");
const BasicServices = require("./basic.service");
class SubscriptionService extends BasicServices {
  constructor() {
    super(Subscription);
  }
}

module.exports.SubscriptionService = new SubscriptionService();
