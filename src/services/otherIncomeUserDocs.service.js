const { OtherIncomeUserDocs } = require("../models/UserOtherIncomeDocument.model");
const BasicServices = require("./basic.service");

class OtherIncomeUserDocsService extends BasicServices {
  constructor() {
    super(OtherIncomeUserDocs);
  }
}

module.exports.OtherIncomeUserDocsService = new OtherIncomeUserDocsService();

