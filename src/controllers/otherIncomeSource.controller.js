const Response = require("../helpers/Response.helpers");
const {
  OtherIncomeSourceService,
} = require("../services/otherIncomeSource.service");

class OtherIncomeSourceController {
  create = async (req, res) => {
    Response(res)
      .body(
        await OtherIncomeSourceService.create({
          ...req.body,
          user: req.user._id,
        })
      )
      .send();
  };

  edit = async (req, res) => {
    Response(res)
      .message("Successfully Updated")
      .body(
        await OtherIncomeSourceService.findByIdAndUpdate(req.params.id, {
          ...req.body,
        })
      )
      .send();
  };

  get = async (req, res) => {
    Response(res)
      .body(await OtherIncomeSourceService.find().populate("user"))
      .send();
  };

  getParticular = async (req, res) => {
    Response(res)
      .body(
        await OtherIncomeSourceService.find({ user: req.params.id }).populate(
          "user"
        )
      )
      .send();
  };
  own = async (req, res) => {
    const data = await OtherIncomeSourceService.find({
      user: req.user._id,
    }).populate("user");
    console.log({ data });
    Response(res).body(data).send();
  };

  delete = async (req, res) => {
    Response(res)
      .message("Successfully deleted")
      .body(await OtherIncomeSourceService.findByIdAndDelete(req.params.id))
      .send();
  };
}

module.exports.OtherIncomeSourceController = new OtherIncomeSourceController();
