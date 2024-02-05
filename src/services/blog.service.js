const { Blog } = require("../models/Blog.model");
const BasicServices = require("./basic.service");
class BlogService extends BasicServices {
  constructor() {
    super(Blog);
  }
}

module.exports.BlogService = new BlogService();
