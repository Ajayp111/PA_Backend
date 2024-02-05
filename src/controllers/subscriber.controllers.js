const Response = require("../helpers/Response.helpers");
const { SubscriberServices } = require("../services/subscribers.service");

class SubscriberControllers {
  create = async (req, res) => {
    Response(res)
      .body(
        await SubscriberServices.create({
          ...req.body,
        })
      )
      .send();
  };

  edit = async (req, res) => {
    Response(res)
      .message("Successfully updated.")
      .body(
        await SubscriberServices.findByIdAndUpdate(req.params.id, {
          ...req.body,
        })
      )
      .send();
  };

  get = async (req, res) => {
    Response(res).body(
      await SubscriberServices.find()
    ).send();
  };



  delete = async (req, res) => {
    Response(res)
      .message("Successfully deleted")
      .body(await SubscriberServices.findByIdAndDelete(req.params.id))
      .send();
  };
}

module.exports.SubscriberControllers = new SubscriberControllers();
