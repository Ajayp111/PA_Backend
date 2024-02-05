const Response = require("../helpers/Response.helpers");
const { RevenueService } = require("../services/revenue.service");

class RevenueController {
  create = async (req, res) => {
    Response(res)
      .body(
        await RevenueService.create({
          ...req.body,
          user: req.user._id,
        })
      )
      .send();
  };

  edit = async (req, res) => {
    Response(res)
      .message("Successfully updated.")
      .body(
        await RevenueService.findByIdAndUpdate(req.params.id, {
          ...req.body,
        })
      )
      .send();
  };

  get = async (req, res) => {
    Response(res).body(
      await RevenueService.find().populate("user")
    ).send();
  };

  getParticularUserRevenues = async (req, res) => {
    Response(res)
      .body(await RevenueService.find({user:req.params.id}))
      .send();
  };
  getOwnRevenues = async (req, res) => {
    Response(res)
      .body(await RevenueService.find({user:req.user._id}))
      .send();
  };

  delete = async (req, res) => {
    Response(res)
      .message("Successfully deleted")
      .body(await RevenueService.findByIdAndDelete(req.params.id))
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

    const revenuesList = await RevenueService.find({
      ...req.body,
      createdAt: { $gt: qDate },
    });

    const revenuesStatus = [
      {
        status: "Total",
        amount: revenuesList.length
      },
      {
        status: "Pending",
        amount: revenuesList.filter((ele) => ele.status === "Pending").length,
      },
      {
        status: "In Progress",
        amount: revenuesList.filter((ele) => ele.status === "In Progress").length,
      },
      {
        status: "Completed",
        amount: revenuesList.filter((ele) => ele.status === "Completed").length,
      },
    ];
    Response(res).body(revenuesStatus).send();
  };
}

module.exports.RevenueController = new RevenueController();
