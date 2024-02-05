const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { ContactService } = require("../services/contact.service");

class ContactControllers {
  create = async (req, res) => {
    Response(res)
      .body(await ContactService.create({ ...req.body }))
      .send();
  };
  edit = async (req, res) => {
    Response(res)
      .message("Successfully Updated")
      .body(
        await ContactService.findByIdAndUpdate(req.params.id, { ...req.body })
      )
      .send();
  };
  get = async (req, res) => {
    Response(res)
      .body(await ContactService.find())
      .send();
  };
  getParticular = async (req, res) => {
    Response(res)
      .body(await ContactService.findById(req.params.id))
      .send();
  };
  delete = async (req, res) => {
    Response(res)
      .message("Successfully deleted")
      .body(await ContactService.findByIdAndDelete(req.params.id))
      .send();
  };
}

module.exports.ContactControllers = new ContactControllers();
