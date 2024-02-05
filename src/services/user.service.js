const { User } = require("../models/Users.model");
const BasicServices = require("./basic.service");
class UserService extends BasicServices {
  constructor() {
    super(User);
  }
}

module.exports.UserService = new UserService();
