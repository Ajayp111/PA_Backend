const { ReturnFiling } = require("../models/ReturnFiling.model");
const BasicServices = require("./basic.service");
class ReturnFilingService extends BasicServices {
  constructor() {
    super(ReturnFiling);
  }
}

module.exports.ReturnFilingService = new ReturnFilingService();
