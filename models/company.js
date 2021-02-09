const mongoose = require('mongoose');

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

BootcampSchema.virtual('iopa', {
  ref: 'Iopa',
  localField: '_id',
  foreignField: 'company',
  justOne: false,
});

BootcampSchema.virtual('staff', {
  ref: 'Staff',
  localField: '_id',
  foreignField: 'company',
  justOne: false,
});

module.exports = mongoose.model('Company', companySchema);
