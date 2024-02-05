const { FAQ } = require("../models/faq.model");
const BasicServices = require("./basic.service");

class FAQService extends BasicServices {
  constructor() {
    super(FAQ);
  }
}

module.exports.FAQService = new FAQService();
