const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Hasher = require("../helpers/Hasher.helper");
const {
  JWT_SECRET = "ajayajay123",
  JWT_EXPIRY,
  JWT_REFRESH_SECRET = "ajayajay123",
  JWT_REFRESH_EXPIRY,
  JWT_EMAIL_VERIFY_SECRET,
} = process.env;

const Schema = new mongoose.Schema(
  {
    picture: {
      type: String,
    },
    cover: {
      type: String,
    },
    name: {
      first: {
        type: String,
      },
      middle: {
        type: String,
      },
      last: {
        type: String,
      },
    },
    dob: {
      type: Date,
    },
    address: {
      type: String,
    },
    occupation: {
      type: String,
    },
    aadhar: {
      type: String,
    },
    pan: {
      type: String,
    },
    identity: {
      aadhar: {
        type: String,
      },
      pan: {
        type: String,
      },
      bankStatement: {
        type: String,
      },
      form16: {
        type: String,
      },
    },

    email: {
      type: String,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    city: {
      type: String,
    },
    phone: {
      type: String,
    },
    otp: {
      email: {
        type: Number,
      },
      phone: {
        type: Number,
      },
    },
    role: {
      type: String,
      enum: ["User", "Employee", "Admin"],
      default: "User",
    },
    password: {
      type: String,
    },
    fileFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReturnFiling",
    },
    subscriptions: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subscription",
        },
        createdAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    additionalDocs: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Documents",
        },
        name: {
          type: String,
        },
        format: [
          {
            type: String,
          },
        ],
        max_size: {
          type: Number,
        },
        type: {
          type: String,
        },
        editAble: {
          type: Boolean,
        },
        value: {
          type: String,
        },
      },
    ],
    onboardingStatus: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Schema.pre("validate", async function (next) {
//   var user = this;
//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified("password")) return next();

//   // generate a salt
//   const salt = await Hasher.getSalt(10);

//   // hash the password using our new salt
//   const hash = await Hasher.hash(user.password,salt);

//   // override the cleartext password with the hashed one
//   user.password = hash;
//   next();
// });

Schema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    Hasher.compare(candidatePassword, this.password)
      .then((isMatch) => resolve(isMatch))
      .catch((err) => reject(err));
  });
};

Schema.methods.generateToken = (data) => {
  console.log({ JWT_SECRET });
  return jwt.sign(
    { ...data },
    JWT_SECRET
    // JWT_EXPIRY
  );
};
Schema.methods.generateRefreshToken = function (data) {
  return jwt.sign(
    { ...data },
    JWT_REFRESH_SECRET
    // JWT_REFRESH_EXPIRY
  );
};
Schema.methods.generateVerifyEmailToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, name: this.name },
    JWT_EMAIL_VERIFY_SECRET || "abcd"
    // JWT_REFRESH_EXPIRY
  );
};

exports.User = mongoose.model("User", Schema);
