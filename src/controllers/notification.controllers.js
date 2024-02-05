const Response = require("../helpers/Response.helpers");
const { NotificationService } = require("../services/notification.service");

class NotificationControllers {
  create = async (req, res) => {
    Response(res)
      .body(
        await NotificationService.create({
          ...req.body,
          user: req.user._id,
        })
      )
      .send();
  };

  edit = async (req, res) => {
    Response(res)
      .message("Successfully updated.")
      .body(
        await NotificationService.findByIdAndUpdate(req.params.id, {
          ...req.body,
        })
      )
      .send();
  };

  get = async (req, res) => {
    Response(res)
      .body(await NotificationService.find().populate("user"))
      .send();
  };

  getParticular = async (req, res) => {
    Response(res)
      .body(await NotificationService.findById(req.params.id))
      .send();
  };

  delete = async (req, res) => {
    Response(res)
      .message("Successfully deleted")
      .body(await NotificationService.findByIdAndDelete(req.params.id))
      .send();
  };

  getOwn = async (req, res) => {
    Response(res)
      .body(await NotificationService.find({ user: req.user }).sort({ createdAt: -1 }))
      .send();
  };

  setRead = async (req, res) => {
    Response(res)
      .message("Successfully updated")
      .body(
        await NotificationService.findByIdAndUpdate(req.params.id, {
          readStatus: true,
        })
      )
      .send();
  };
}

module.exports.NotificationControllers = new NotificationControllers();
