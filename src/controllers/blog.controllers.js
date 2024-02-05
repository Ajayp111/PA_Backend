
const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { BlogService } = require("../services/blog.service");
 
class BlogControllers {
  create = async (req,res) => {
    Response(res).body(await BlogService.create({...req.body,user:req.user._id})).send()
  }
  edit = async (req,res) => {
    Response(res).message("Successfully Updated").body(await BlogService.findByIdAndUpdate(req.params.id,{...req.body})).send()
  }
  get = async (req,res) => {
    Response(res).body(await BlogService.find().populate("user")).send()
  }
  getParticular = async (req,res) =>{
    Response(res).body(await BlogService.findById(req.params.id)).send()
  }
  delete = async (req,res) => {
    Response(res).message("Successfully deleted").body(await BlogService.findByIdAndDelete(req.params.id)).send()
  }
}

module.exports.BlogControllers = new BlogControllers();
