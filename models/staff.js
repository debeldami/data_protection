const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'please add an email'],
      unique: [true, 'email already exist'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: true,
    },
    password: {
      type: String,
      required: [true, 'please add a password'],
      minlength: [5, 'password must exceed 5 characters'],
      select: false,
    },
    permission: {
      type: Number,
    },
    resetPasswordToken: String,
    resetPasswordExp: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Staff', staffSchema);
