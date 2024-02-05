const { Documents } = require("../models/Documents.model");
const BasicServices = require("./basic.service");
class DocumentService extends BasicServices {
  constructor() {
    super(Documents);
  }
}

module.exports.DocumentService = new DocumentService();
