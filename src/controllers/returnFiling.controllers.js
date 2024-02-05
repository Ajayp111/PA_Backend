const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { ReturnFilingService } = require("../services/returnFiling.service");
const { UserService } = require("../services/user.service");

class ReturnFilingController {
  create = async (req, res) => {
    Response(res)
      .body(await ReturnFilingService.create({ ...req.body }))
      .send();
  };
  edit = async (req, res) => {
    Response(res)
      .message("Successfully Updated")
      .body(
        await ReturnFilingService.findByIdAndUpdate(req.params.id, {
          ...req.body,
        })
      )
      .send();
  };
  get = async (req, res) => {
    Response(res)
      .body(await ReturnFilingService.find())
      .send();
  };
  getParticular = async (req, res) => {
    Response(res)
      .body(await ReturnFilingService.findById(req.params.id))
      .send();
  };
  getCurrentUserReturnFile = async (req, res) => {
    const user = await UserService.findById(req.user._id);
    if (!user.fileFor)
      throw HttpError(
        400,
        "Something Went Wrong, Please Go back and try Again"
      );
    Response(res)
      .body(await ReturnFilingService.findById(user.fileFor))
      .send();
  };
  delete = async (req, res) => {
    Response(res)
      .message("Successfully deleted")
      .body(await ReturnFilingService.findByIdAndDelete(req.params.id))
      .send();
  };
}

module.exports.ReturnFilingController = new ReturnFilingController();
