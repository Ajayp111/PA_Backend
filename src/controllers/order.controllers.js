
const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { OrderService } = require("../services/order.service");
const { OtherIncomeUserDocsService } = require("../services/otherIncomeUserDocs.service");
const { PaymentService } = require("../services/payment.service");
const { ReturnFilingService } = require("../services/returnFiling.service");
const { UserService } = require("../services/user.service");

class OrderController {
  create = async (req, res) => {
    const recentOrder = await OrderService.find()
      .sort({ createdAt: -1 })
      .limit(1);
    let orderId;
    if (recentOrder && recentOrder.length > 0) {
      console.log("already");
      orderId = recentOrder[0].orderId;
      const num = parseInt(orderId.split("PA")[1]);
      if (num < 9) orderId = "PA" + `00${num + 1}`;
      else if (num >= 9 && num <= 99) orderId = "PA" + `0${num + 1}`;
      else orderId = "PA" + (num + 1);
    } else {
      console.log("not Found");
      orderId = "PA001";
    }
    console.log("body", req.body);
    await PaymentService.create({
      fileFor: req.body.fileFor,
      total_tax: req.body.total_tax,
      payment: req.body.payment,
      status: "Pending",
      orderId,
      user: req.user._id,
    });

    Response(res)
      .body(
        await OrderService.create({
          ...req.body,
          orderId,
          status: "Pending",
          user: req.user._id,
        })
      )
      .send();
  };
  createSkippedOrder = async (req, res) => {
    const recentOrder = await OrderService.find()
      .sort({ createdAt: -1 })
      .limit(1);
    let orderId;
    if (recentOrder && recentOrder.length > 0) {
      console.log("already");
      orderId = recentOrder[0].orderId;
      const num = parseInt(orderId.split("PA")[1]);
      if (num < 9) orderId = "PA" + `00${num + 1}`;
      else if (num >= 9 && num <= 99) orderId = "PA" + `0${num + 1}`;
      else orderId = "PA" + (num + 1);
    } else {
      console.log("not Found");
      orderId = "PA001";
    }
    console.log("body", req.body);
    const user = await UserService.findById(req.user._id);
    if (!user) throw new HttpError(400, "Something went Wrong");
    if (!user.fileFor) throw new HttpError(400, "Please Select Pricing First");

    const fileFor = await ReturnFilingService.findById(user.fileFor);
    if (!fileFor)
      throw new HttpError(
        400,
        "Something went Wrong, Please Select Pricing Again"
      );

    const otherIncomeSources = await OtherIncomeUserDocsService.find({
      user: user._id,
    });

    const payload = {
      fileFor: {
        _id: fileFor._id,
        title: fileFor.title,
        price: fileFor.price,
        discount: fileFor.discount,
      },
      total_tax: req.body.total_tax,
      payment: fileFor.price,
      status: "Pending",
      orderId,
      user: req.user._id,
      otherIncomeSources,
    };
    await PaymentService.create({
      ...payload,
    });

    Response(res).body(await OrderService.create({...payload})).send()
  }
  edit = async (req,res) => {
    Response(res).message("Successfully Updated").body(await OrderService.findByIdAndUpdate(req.params.id,{...req.body})).send()
  }
  sucessViaSession = async (req,res) => {
    Response(res).message("Successfully Updated").body(await PaymentService.findOneAndUpdate({sessionId:req.params.sessionId},{status:"Completed"})).send()
  }
  failedViaSession = async (req,res) => {
    Response(res).message("Successfully Updated").body(await PaymentService.findOneAndUpdate({sessionId:req.params.sessionId},{status:"Failed"})).send()
  }
  get = async (req,res) => {
    Response(res).body(await OrderService.find().populate("user").sort({createdAt:-1})).send()
  }
  getParticular = async (req,res) => {
    Response(res).body(await OrderService.findById(req.params.id).populate("user").sort({createdAt:-1})).send()
  }
  getAllOrdersOfOwn = async (req,res) => {
    Response(res).body(await OrderService.find({user:req.user._id}).sort({createdAt:-1})).send()
  }
  delete = async (req,res) => {
    Response(res).message("Successfully deleted").body(await OrderService.findByIdAndDelete(req.params.id)).send()
  }
  
  getDuring = async (req, res) => {
    let today = new Date(Date.now());
    let qDate = today;
    switch (req.params.date) {
      case "daily":
        qDate.setDate(today.getDate() - 1);
        break;
      case "monthly":
        qDate.setMonth(today.getMonth() - 1);
        break;
      case "yearly":
        qDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        console.log("Wrong paramater provided");
    }

    const ordersList = await OrderService.find({
      ...req.body,
      createdAt: { $gt: qDate },
    });

    const ordersStatus = [
      {
        status: "Total",
        amount: ordersList.length
      },
      {
        status: "Pending",
        amount: ordersList.filter((ele) => ele.status === "Pending").length,
      },
      {
        status: "In Progress",
        amount: ordersList.filter((ele) => ele.status === "In Progress").length,
      },
      {
        status: "Completed",
        amount: ordersList.filter((ele) => ele.status === "Completed").length,
      },
    ];
    Response(res).body(ordersStatus).send();
  };
}

module.exports.OrderController = new OrderController();
