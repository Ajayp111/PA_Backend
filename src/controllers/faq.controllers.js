const Response = require("../helpers/Response.helpers");
const { FAQService } = require("../services/faq.service");

class FAQControllers {
  create = async (req, res) => {
    Response(res)
      .body(await FAQService.create({ ...req.body, user: req.user._id }))
      .send();
  };

  edit = async (req, res) => {
    Response(res)
      .message("Successfully Updated")
      .body(await FAQService.findByIdAndUpdate(req.params.id, { ...req.body }))
      .send();
  };

  get = async (req, res) => {
    Response(res)
      .body(await FAQService.find())
      .send();
  };

  getParticular = async (req, res) => {
    Response(res)
      .body(await FAQService.findById(req.params.id))
      .send();
  };

  delete = async (req, res) => {
    Response(res)
      .message("Successfully deleted")
      .body(await FAQService.findByIdAndDelete(req.params.id))
      .send();
  };
}

module.exports.FAQControllers = new FAQControllers();
