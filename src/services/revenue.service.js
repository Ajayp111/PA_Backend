const { Reveneu } = require("../models/Reveneu.model");
const BasicServices = require("./basic.service");
class RevenueService extends BasicServices {
  constructor() {
    super(Reveneu);
  }
}

module.exports.RevenueService = new RevenueService();
