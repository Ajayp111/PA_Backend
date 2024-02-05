const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { FeedbackService } = require("../services/feedback.service");

class FeedbackController {
  create = async (req, res) => {
    Response(res)
      .body(await FeedbackService.create({ ...req.body, user: req.user._id }))
      .send();
  };
  edit = async (req, res) => {
    Response(res)
      .message("Successfully Updated")
      .body(
        await FeedbackService.findByIdAndUpdate(req.params.id, { ...req.body })
      )
      .send();
  };
  get = async (req, res) => {
    Response(res)
      .body(await FeedbackService.find().populate("user"))
      .send();
  };
  getParticular = async (req, res) => {
    Response(res)
      .body(await FeedbackService.findById(req.params.id))
      .send();
  };
  delete = async (req, res) => {
    Response(res)
      .message("Successfully deleted")
      .body(await FeedbackService.findByIdAndDelete(req.params.id))
      .send();
  };
}

module.exports.FeedbackController = new FeedbackController();
