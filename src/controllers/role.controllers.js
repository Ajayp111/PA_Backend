const Response = require("../helpers/Response.helpers");
const { RoleService } = require("../services/role.service");

class RoleController {
  create = async (req, res) => {
    Response(res)
      .body(await RoleService.create({ ...req.body }))
      .send();
  };

  edit = async (req, res) => {
    Response(res)
      .message("Successfully Updated")
      .body(await RoleService.findByIdAndUpdate(req.params.id, { ...req.body }))
      .send();
  };

  get = async (req, res) => {
    Response(res)
      .body(await RoleService.find())
      .send();
  };

  getParticular = async (req, res) => {
    Response(res)
      .body(await RoleService.findById(req.params.id))
      .send();
  };

  delete = async (req, res) => {
    Response(res)
      .message("Successfully deleted")
      .body(await RoleService.findByIdAndDelete(req.params.id))
      .send();
  };
}

module.exports.RoleController = new RoleController();
