//middlewares
const express = require("express");
const morgan = require("morgan"); // for consoling api request calls
const helmet = require("helmet"); // secures connection by adding additional header
const cors = require("cors"); // handling cors errors
const cron = require("cron");
const ErrorHandler = require("../middlewares/error.middlewares"); // error handler for routes, since we will continue to next route upon request

//Routers
const { UserRouter } = require("../routes/users.routes");
const { ReturnFilingRouter } = require("../routes/returnFiling.routes");
const { SubscriptionRouter } = require("../routes/subscription.routes");
const { FeedbackRouter } = require("../routes/feedback.routes");
const { FileUploadRouter } = require("../routes/file-upload.routes");
const { OrderRouter } = require("../routes/order.routes");
// const { getClientsByAdminId } = require("../routes/users.routes");
const { PaymentRouter } = require("../routes/payment.routes");
const { ContactRouter } = require("../routes/contact.routes");
const { DocumentRouter } = require("../routes/document.routes");
const { BlogRouter } = require("../routes/blog.routes");
const { RoleRouter } = require("../routes/role.routes");
const { NotificationRouter } = require("../routes/notification.routes");
const {
  OtherIncomeSourceRouter,
} = require("../routes/otherIncomeService.routes");
const { RevenueRouter } = require("../routes/revenue.routes");
const { SubscriberRouter } = require("../routes/subscribers.routes");
const {
  OtherIncomeUserDocsRouter,
} = require("../routes/otherIncomeUserDocs.routes");
const { StripeRouter } = require("../routes/stripe.routes");
const { FAQRouter } = require("../routes/faq.routes");
const googleReviewsRoutes = require("../routes/googleReviews.routes");

module.exports = (app) => {
  app.use(express.json({ limit: "9999000009mb" })); // body parser, parses request body
  app.use(express.urlencoded({ extended: true })); // parses encoded url
  app.use(morgan("tiny")); // initiating console api requests
  app.use(helmet());
  app.use(cors());

  //start of routes
  app.use("/api/users", UserRouter);
  app.use("/api/documents", DocumentRouter);
  app.use("/api/return/file", ReturnFilingRouter);
  app.use("/api/subscription", SubscriptionRouter);
  app.use("/api/feedback", FeedbackRouter);
  app.use("/api/payments", PaymentRouter);
  app.use("/api/orders", OrderRouter);
  app.use("/api/contact", ContactRouter);
  app.use("/api/blogs", BlogRouter);
  app.use("/api/upload/files", FileUploadRouter);
  app.use("/api/roles", RoleRouter);
  app.use("/api/revenue", RevenueRouter);
  app.use("/api/subscribers", SubscriberRouter);
  app.use("/api/notifications", NotificationRouter);
  app.use("/api/stripe", StripeRouter);
  app.use("/api/other_income_source", OtherIncomeSourceRouter);
  app.use("/api/other_income_source/docs", OtherIncomeUserDocsRouter);
  app.use("/api/faq", FAQRouter);
  app.use("/api/google_reviews", googleReviewsRoutes);

  //end of routes

  // Scheduling daily job to fetch Google reviews
  const job = new cron.CronJob("0 0 * * *", async () => {
    console.log("Fetching Google reviews...");

    try {
      const response = await axios.get(
        "http://localhost:3000/api/?placeId=<your_place_id>"
      );

      console.log(`Saved ${response.data.length} Google reviews.`);
    } catch (error) {
      console.error("Error fetching Google reviews:", error.message);
    }
  });

  job.start();
  //handling async errors in apis
  app.use(ErrorHandler);

  // // Route to get all clients of a particular admin
  // router.get("/admin/:adminId/clients", [Auth], async (req, res) => {
  //   try {
  //     const clients = await Client.find({ admin: req.params.adminId });
  //     res.json(clients);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // });

  //adding additional apis
  app.get("/", (req, res) =>
    res.send({
      error: false,
      message: "Pathak Associates Server IS LIVE!",
      result: null,
    })
  );
  app.get("*", (req, res) =>
    res
      .status(404)
      .send({ error: true, message: "Route not Found!", result: null })
  );
};

console.log("🛣️  Routes setup completed");
