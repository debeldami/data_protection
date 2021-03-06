const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'please add an email'],
      unique: [true, 'email already exist'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    role: {
      type: String,
      enum: ['company', , 'admin'],
      default: 'company',
    },
    password: {
      type: String,
      required: [true, 'please add a password'],
      minlength: [5, 'password must exceed 5 characters'],
      select: false,
    },
    nopa: {
      type: Number,
    },
    cnopa: {
      type: Number,
    },
    resetPasswordToken: String,
    resetPasswordExp: Date,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

companySchema.virtual('iopa', {
  ref: 'Iopa',
  localField: '_id',
  foreignField: 'company',
  justOne: false,
});

companySchema.virtual('staff', {
  ref: 'Staff',
  localField: '_id',
  foreignField: 'company',
  justOne: false,
});

//password encryption using brcypt
companySchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Sign JWT and return
companySchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

companySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Company', companySchema);
