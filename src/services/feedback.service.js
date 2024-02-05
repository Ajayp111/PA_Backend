const { Feedback } = require("../models/Feedback.model");
const BasicServices = require("./basic.service");
class FeedbackService extends BasicServices {
  constructor() {
    super(Feedback);
  }
}

module.exports.FeedbackService = new FeedbackService();
