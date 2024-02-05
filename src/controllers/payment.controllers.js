const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { OrderService } = require("../services/order.service");
const { PaymentService } = require("../services/payment.service");

class PaymentController {
  create = async (req, res) => {
    const order = await OrderService.findOne({ orderId: req.params.orderId });
    const payload = {
      fileFor: order.fileFor,
      total_tax: order.total_tax,
      payment: req.body.amount,
      type: req.body.type,
      status: "Pending",
      orderId: req.params.orderId,
      user: order.user,
      otherIncomeSources: order.otherIncomeSources,
    };
    Response(res)
      .message("Successfully Updated")
      .body(await PaymentService.create({ ...payload }))
      .send();
  };
  edit = async (req, res) => {
    Response(res)
      .message("Successfully Updated")
      .body(
        await PaymentService.findByIdAndUpdate(req.params.id, { ...req.body })
      )
      .send();
  };
  get = async (req, res) => {
    Response(res)
      .body(await PaymentService.find().populate("user"))
      .send();
  };
  getAllPaymentsOfOwn = async (req, res) => {
    Response(res)
      .body(
        await PaymentService.find({ user: req.user._id }).sort({
          createdAt: -1,
        })
      )
      .send();
  };
  delete = async (req, res) => {
    Response(res)
      .message("Successfully deleted")
      .body(await PaymentService.findByIdAndDelete(req.params.id))
      .send();
  };
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

    const paymentsList = await PaymentService.find({
      ...req.body,
      createdAt: { $gt: qDate },
    });

    const paymentsStatus = [
      {
        status: "Total",
        amount: paymentsList.length,
      },
      {
        status: "Pending",
        amount: paymentsList.filter((ele) => ele.status === "Pending").length,
      },
      {
        status: "In Progress",
        amount: paymentsList.filter((ele) => ele.status === "In Progress")
          .length,
      },
      {
        status: "Completed",
        amount: paymentsList.filter((ele) => ele.status === "Completed").length,
      },
    ];
    Response(res).body(paymentsStatus).send();
  };
}

module.exports.PaymentController = new PaymentController();
