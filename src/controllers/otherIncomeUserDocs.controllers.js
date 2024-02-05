const Response = require("../helpers/Response.helpers");
const {
  OtherIncomeUserDocsService,
} = require("../services/otherIncomeUserDocs.service");

class OtherIncomeUserDocsController {
  create = async (req, res) => {
    Response(res)
      .body(
        await OtherIncomeUserDocsService.create({
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
        await OtherIncomeUserDocsService.findByIdAndUpdate(req.params.id, {
          ...req.body,
        })
      )
      .send();
  };

  get = async (req, res) => {
    Response(res)
      .body(await OtherIncomeUserDocsService.find().populate("user"))
      .send();
  };

  getParticular = async (req, res) => {
    Response(res)
      .body(
        await OtherIncomeUserDocsService.find({ user: req.params.id }).populate(
          "user"
        )
      )
      .send();
  };
  own = async (req, res) => {
    const data = await OtherIncomeUserDocsService.find({
      user: req.user._id,
    }).populate("user");
    console.log({ data });
    Response(res).body(data).send();
  };

  delete = async (req, res) => {
    Response(res)
      .message("Successfully deleted")
      .body(await OtherIncomeUserDocsService.findByIdAndDelete(req.params.id))
      .send();
  };
}

module.exports.OtherIncomeUserDocsController =
  new OtherIncomeUserDocsController();
