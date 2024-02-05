const { Role } = require("../models/Role.model");
const BasicServices = require("./basic.service");

class RoleService extends BasicServices {
  constructor() {
    super(Role);
  }
}

module.exports.RoleService = new RoleService();
