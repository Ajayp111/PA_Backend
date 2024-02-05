const jwt = require("jsonwebtoken");
const HasherHelper = require("../helpers/Hasher.helper");
const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { sendSmsViaTwilio } = require("../helpers/sendSmsViaTwilio");
const { ReturnFilingService } = require("../services/returnFiling.service");
const { UserService } = require("../services/user.service");
const { RabbitMQ } = require("../setup/amqp.setup");
const { JWT_EMAIL_VERIFY_SECRET } = process.env;

class UserController {
  signUp = async (req, res, next) => {
    const body = req.body;
    //validation should apply here for upcoming body

    let user = await UserService.findOne({ phone: body.phone }).lean();

    if (user && user.verify.email && user.password)
      throw new HttpError(409, "User Already Exists!");

    if (!user) {
      user = await UserService.create({ ...body, otp: { email: 123456 } });
    } else {
      user = await UserService.findByIdAndUpdate(user._id, {
        ...body,
        otp: { email: 123456 },
      });
    }

    // const emailVerifyToken = user.generateVerifyEmailToken();

    // sendMail(user.email,"Please Verify your email for eduthum",
    // `please do not share this link with another person
    // https://eduthum-api.applore.in/api/users/email/verify/${emailVerifyToken}
    // `)
    Response(res).status(201).message("Successfully registered!").send();
  };

  verifyOtp = async (req, res, next) => {
    const body = req.body;
    let accessToken;
    let refreshToken;
    let user;
    //validation should apply here for upcoming body
    if (req.body.phone) {
      user = await UserService.findOne({ phone: body.phone });
      if (!user) throw new HttpError(409, "User doesn't Exists!");

      const { generateRefreshToken, generateToken } = user.schema.methods;
      console.log({ body, user });
      if (body.otp != user.otp.phone) {
        throw new HttpError(401, "Invalid Otp1");
      }
      if (body.otp == -1) {
        throw new HttpError(401, "Invalid Otp2");
      }
      user.otp.phone = -1;
      accessToken = generateToken({
        _id: user._id,
        phone: user.phone,
        role: user.role,
      });
      refreshToken = generateRefreshToken({
        _id: user._id,
        phone: user.phone,
        role: user.role,
      });

      await user.save();
    }

    if (req.body.email) {
      user = await UserService.findOne({ email: req.body.email });
      if (!user) throw new HttpError(409, "User doesn't Exists!");

      const { generateRefreshToken, generateToken } = user.schema.methods;
      console.log({ body, user });
      if (body.otp != user.otp.email) {
        throw new HttpError(401, "Invalid Otp1");
      }
      if (body.otp == -1) {
        throw new HttpError(401, "Invalid Otp2");
      }
      user.otp.email = -1;
      accessToken = generateToken({
        _id: user._id,
        phone: user.phone,
        role: user.role,
      });
      refreshToken = generateRefreshToken({
        _id: user._id,
        phone: user.phone,
        role: user.role,
      });

      await user.save();
    }

    // const emailVerifyToken = user.generateVerifyEmailToken();

    // sendMail(user.email,"Please Verify your email for eduthum",
    // `please do not share this link with another person
    // https://eduthum-api.applore.in/api/users/email/verify/${emailVerifyToken}
    // `)
    Response(res)
      .status(201)
      .message("Successfully Verified!")
      .body({
        accessToken,
        refreshToken,
        onboardingStatus: user.onboardingStatus,
      })
      .send();
  };
  editCurrentUser = async (req, res) => {
    //validation should apply here for upcoming body
    if (req.body.password) {
      // generate a salt
      const salt = await HasherHelper.getSalt(10);

      // hash the password using our new salt
      const hash = await HasherHelper.hash(req.body.password, salt);

      // override the cleartext password with the hashed one
      req.body.password = hash;
    }
    let user;
    if (req.body.onboardingStatus) {
      user = await UserService.findById(req.user._id);
      if (user.onboardingStatus > parseInt(req.body.onboardingStatus)) {
        req.body.onboardingStatus = user.onboardingStatus;
      }
    }

    user = await UserService.findByIdAndUpdate(req.user._id, {
      ...req.body,
    });

    if (!user) throw new HttpError(409, "User doesn't Exists!");

    Response(res).status(201).message("Successfully Updated!").send();
  };
  login = async (req, res) => {
    const { phone } = req.body;
    let user = await UserService.findOne({ phone });

    // if (user) {
    //   throw new HttpError(400, "Account Already Exists!");
    // }
    if (!user) {
      user = await UserService.create({
        phone,
      });
    }
    // console.log (user)
    // user = await user.lean();
    // console.log({user})
    const otp = Math.floor(Math.random() * (999999 - 100000) + 100000);
    user = await UserService.findByIdAndUpdate(user._id, {
      otp: { phone: 123456 },
    });
    await sendSmsViaTwilio(
      `Your Otp for Pathak Associates is ${otp}`,
      `+91${phone}`
    );
    Response(res).message("Successfully Otp Sent!").send();
  };
  forgotPassword = async (req, res) => {
    const { phone, email } = req.body;
    let user;
    if (phone) {
      user = await UserService.findOne({ phone });
      if (!user) {
        throw new HttpError(400, "Account Doesn't Exists!");
      }
      const otp = Math.floor(Math.random() * (999999 - 100000) + 100000);
      user = await UserService.findByIdAndUpdate(user._id, {
        otp: { phone: otp },
      });
      await sendSmsViaTwilio(
        `Your Otp for Pathak Associates is ${otp}`,
        `+91${phone}`
      );
    }
    if (email) {
      user = await UserService.findOne({ email });
      if (!user) {
        throw new HttpError(400, "Account Doesn't Exists!");
      }
      const otp = Math.floor(Math.random() * (999999 - 100000) + 100000);
      user = await UserService.findByIdAndUpdate(user._id, {
        otp: { email: otp },
      });
    }

    // console.log (user)
    // user = await user.lean();
    // console.log({user})

    Response(res).message("Successfully Otp Sent!").send();
  };

  resendOtp = async (req, res) => {
    const { phone } = req.body;
    let user = await UserService.findOne({ phone });

    if (!user) {
      user = await UserService.create({
        phone,
      });
    }
    // console.log (user)
    // user = await user.lean();
    // console.log({user})
    const otp = Math.floor(Math.random() * (999999 - 100000) + 100000);
    user = await UserService.findByIdAndUpdate(user._id, {
      otp: { phone: otp },
    });
    await sendSmsViaTwilio(
      `Your Otp for Pathak Associates is ${otp}`,
      `+91${phone}`
    );
    Response(res).message("Successfully Otp Sent!").send();
  };
  loginViaPassword = async (req, res) => {
    const { email, password } = req.body;
    let user = await UserService.findOne({ email });

    if (!user) {
      throw new HttpError(401, "Invalid Credentials!");
    }
    const { generateRefreshToken, generateToken } = user.schema.methods;

    const isVerify = await HasherHelper.compare(password, user.password);
    if (!isVerify) throw new HttpError(401, "Invalid Credentials!");

    const accessToken = generateToken({
      _id: user._id,
      phone: user.phone,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      _id: user._id,
      phone: user.phone,
      role: user.role,
    });

    Response(res)
      .body({
        accessToken,
        refreshToken,
        onboardingStatus: user.onboardingStatus,
        role: user.role,
      })
      .send();
  };
  createAdminUser = async (req, res) => {
    await UserService.create({ ...req.body, role: "Admin" });
    Response(res).status(201).message("Successfully Created").send();
  };
  editAdminUser = async (req, res) => {
    Response(res)
      .message("Successfully Updated")
      .body(await UserService.findByIdAndUpdate(req.params.id, { ...req.body }))
      .send();
  };

  deleteAdminUser = async (req, res) => {
    Response(res)
      .message("Successfully Deleted")
      .body(await UserService.findByIdAndDelete(req.params.id))
      .send();
  };
  getAllAdminUsers = async (req, res) => {
    Response(res)
      .body(await UserService.find({ role: "Admin" }))
      .send();
  };
  getCurrentUser = async (req, res) => {
    const user = await UserService.findById(req.user._id);
    Response(res).body(user).send();
  };
  getCurrentUserPricing = async (req, res) => {
    const user = await UserService.findById(req.user._id);
    const pricing = await ReturnFilingService.findById(user.fileFor);
    Response(res).body(pricing).send();
  };

  verifyEmail = async (req, res) => {
    const verifyToken = req.params.token;
    const user = jwt.verify(verifyToken, JWT_EMAIL_VERIFY_SECRET || "abcd");
    await UserService.findByIdAndUpdate(user._id, { isVerified: true });
    Response(res).message("Email Successfully Verified").send();
  };
  getAllVerifiedUsers = async (req, res) => {
    const user = await UserService.find({
      role: { $nin: ["Admin"] },
      assignedTo: req.user._id,
    }).sort({ createdAt: -1 });
    Response(res).body(user).send();
  };

  getAllAssignedUsers = async (req, res) => {
    const adminId = req.user._id;
    console.log({ adminId });

    const admin = await UserService.find({ assignedTo: adminId });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    Response(res).body(admin).send();
  };

  getAllUsers = async (req, res) => {
    const user = await UserService.find({
      _id: { $nin: [req.user._id] },
    }).sort({ createdAt: -1 });
    Response(res).body(user).send();
  };
  getUserDetails = async (req, res) => {
    const { userId } = req.params;
    const user = await UserService.findById(userId);
    if (!user) throw new HttpError(400, "No User Exists!");
    // const favClbs = await FavoritesService.find()

    Response(res).body(user).send();
  };
  editProfile = async (req, res) => {
    await UserService.findByIdAndUpdate(req.params.userId, { ...req.body });
    Response(res).message("Successfully Updated").send();
  };
  addAdditionalDocs = async (req, res) => {
    await UserService.findByIdAndUpdate(req.user._id, {
      $addToSet: { additionalDocs: req.body.additionalDocs },
    });
    Response(res).message("Successfully Updated").send();
  };
  adminAttributesOfUsers = async (req, res) => {
    const promises = [
      UserService.find({ role: { $nin: ["Admin", "SuperAdmin"] } }).count(),
      UserService.find({
        role: { $nin: ["Admin", "SuperAdmin"] },
        isVerified: true,
      }).count(),
      UserService.find({
        role: { $nin: ["Admin", "SuperAdmin"] },
        isVerified: false,
      }).count(),
      CLBService.getAllUsersWhoCreatedClbs(),
    ];
    let [totalUsers, activeUsers, inActiveUsers, clbCreators] =
      await Promise.all(promises);
    clbCreators = [...clbCreators].length;
    Response(res)
      .body({ totalUsers, activeUsers, inActiveUsers, clbCreators })
      .send();
  };

  createTestUser = async (req, res) => {
    await UserService.create({ ...req.body });
    Response(res).status(201).message("Test user successfully Created").send();
  };
  // getCurrentSelectedPricingPlan = async (req, res) => {
  //   await UserService.create({ ...req.body });
  //   Response(res).status(201).message("Test user successfully Created").send();
  // };
  createNewUser = async (req, res) => {
    await UserService.create({ ...req.body });
    Response(res).status(201).message("Successfully Created").send();
  };
  getStaff = async (req, res) => {
    Response(res)
      .status(200)
      .body(await UserService.find({ role: { $ne: "User" } }))
      .send();
  };

  signUpGoogle = async (req, res, next) => {
    let accessToken;
    let refreshToken;
    const body = req.body;
    let user = await UserService.findOne({ email: body.email });

    if (!user) {
      user = await UserService.create({ ...body });
    }

    if (user && user.email) {
      console.log(user);
      const { generateRefreshToken, generateToken } = user.schema.methods;
      accessToken = generateToken({
        _id: user._id,
        email: user.email,
        role: user.role,
      });
      refreshToken = generateRefreshToken({
        _id: user._id,
        email: user.email,
        role: user.role,
      });
      await user.save();
    }

    Response(res)
      .status(201)
      .message("Successfully logged in!")
      .body({
        accessToken,
        refreshToken,
        onboardingStatus: user.onboardingStatus,
      })
      .send();
  };
}

module.exports.UserController = new UserController();
