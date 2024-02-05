
const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { DocumentService } = require("../services/documents.service");

class DocumentControllers {
  create = async (req,res) => {
    Response(res).body(await DocumentService.create({...req.body,user:req.user._id})).send()
  }
  edit = async (req,res) => {
    Response(res).message("Successfully Updated").body(await DocumentService.findByIdAndUpdate(req.params.id,{...req.body})).send()
  }
  get = async (req,res) => {
    Response(res).body(await DocumentService.find()).send()
  }
  delete = async (req,res) => {
    Response(res).message("Successfully deleted").body(await DocumentService.findByIdAndDelete(req.params.id)).send()
  }
}

module.exports.DocumentControllers = new DocumentControllers();
