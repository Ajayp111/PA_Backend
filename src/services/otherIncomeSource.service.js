const { OtherIncomeSource } = require("../models/OtherIncomeSource.model");
const BasicServices = require("./basic.service");

class OtherIncomeSourceService extends BasicServices {
  constructor() {
    super(OtherIncomeSource);
  }
}

module.exports.OtherIncomeSourceService = new OtherIncomeSourceService();
