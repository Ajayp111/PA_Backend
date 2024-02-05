
const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { SubscriptionService } = require("../services/subscription.service");

class SubscriptionController {
  create = async (req,res) => {
    Response(res).body(await SubscriptionService.create({...req.body})).send()
  }
  edit = async (req,res) => {
    Response(res).message("Successfully Updated").body(await SubscriptionService.findByIdAndUpdate(req.params.id,{...req.body})).send()
  }
  get = async (req,res) => {
    Response(res).body(await SubscriptionService.find()).send()
  }
  delete = async (req,res) => {
    Response(res).message("Successfully deleted").body(await SubscriptionService.findByIdAndDelete(req.params.id)).send()
  } 
}

module.exports.SubscriptionController = new SubscriptionController();
