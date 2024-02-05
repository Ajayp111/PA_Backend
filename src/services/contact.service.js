const { Contact } = require("../models/Contact.model");
const BasicServices = require("./basic.service");
class ContactService extends BasicServices {
  constructor() {
    super(Contact);
  }
}

module.exports.ContactService = new ContactService();
