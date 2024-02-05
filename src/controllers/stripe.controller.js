const { OrderService } = require("../services/order.service");
const { OtherIncomeUserDocsService } = require("../services/otherIncomeUserDocs.service");
const { PaymentService } = require("../services/payment.service");
const { ReturnFilingService } = require("../services/returnFiling.service");
const { UserService } = require("../services/user.service");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class StripeController {
  pricingPayment = async (req, res) => {
    const user = await UserService.findById(req.user._id);
    if(!user) throw new HttpError(400,"Something went Wrong");

    const fileFor = await ReturnFilingService.findById(user.fileFor)
    if(!fileFor) throw new HttpError(400,"Something went Wrong, Please Select Pricing Again");

    const recentOrder = await OrderService.find().sort({createdAt:-1}).limit(1);
    let orderId;
    if(recentOrder && recentOrder.length > 0){
      console.log("already")
      orderId = recentOrder[0].orderId
      const num = parseInt(orderId.split("PA")[1]);
      if(num < 9)  orderId = "PA"+`00${num + 1}`
      else if ((num >= 9) && (num <= 99)) orderId = "PA" + `0${num + 1}`
      else orderId = "PA" + (num + 1)
    }else {
      console.log("not Found")
      orderId = "PA001"
    }



    const otherIncomeSources = await OtherIncomeUserDocsService.find({user:user._id});

    

    const product = await stripe.products.create({
      name: req.body.name,
    });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: parseInt(req.body.amount) * 100,
      currency: "inr",
    });

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price: price.id,
            quantity: req.body.quantity || 1,
          },
        ],
        success_url: 'https://pathakassociates.in/pricing/payment/sucess/{CHECKOUT_SESSION_ID}',
        cancel_url: 'https://pathakassociates.in/pricing/payment/failed/{CHECKOUT_SESSION_ID}',
      });
      const payload = {
        fileFor:{
          _id: fileFor._id,
          title: fileFor.title,
          price: fileFor.price,
          discount: fileFor.discount,
        },
        total_tax:req.body.total_tax,
        payment:fileFor.price,
        status:"Pending",
        orderId,
        user:req.user._id,
        otherIncomeSources,
        sessionId:session.id
      }
    // console.log({ price });
    await PaymentService.create({
      ...payload
     })
     await OrderService.create({...payload})
 
    // res.redirect(303, session.url); 
    res.send({url:session.url})
};
}

exports.StripeController = new StripeController();
