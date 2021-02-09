const mongoose = require('mongoose');

const iopaSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: true,
    },
    staff: {
      type: mongoose.Schema.ObjectId,
      ref: 'Staff',
      required: true,
    },
    department: {
      type: String,
    },
    pop: {
      type: [String],
    },
    rrftp: {
      type: [String],
    },
    tor: {
      type: [String],
    },
    toi: {
      type: [String],
    },
    topd: {
      type: [String],
    },
    tospd: {
      type: [String],
    },
    sootpd: {
      type: [String],
    },
    lopd: {
      type: [String],
    },
    lbfppd: {
      type: [String],
    },
    lbfpspd: {
      type: [String],
    },
    liop: {
      type: [String],
    },
    rpopd: {
      type: Number,
    },
    lrtktpd: {
      type: [String],
    },
    taosmptpd: {
      type: [String],
    },
    rotpd: {
      type: [String],
    },
    tore: {
      type: [String],
    },
    dcdp: {
      type: [String],
    },
    coawridpip: {
      type: [String],
    },
    tctiotpdatt: {
      type: [String],
    },
    tm: {
      type: [String],
    },
    iadr: {
      type: String,
      enum: ['yes', 'no'],
    },
    eoadmip: {
      type: String,
      enum: ['yes', 'no', 'not applicable'],
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

BootcampSchema.pre('save', function (next) {
  const {
    department,
    pop,
    nrrftp,
    tor,
    toi,
    topd,
    tospd,
    sootpd,
    lopd,
    lbfppd,
    lbfpspd,
    liop,
    rpopd,
    lrtktpd,
    taosmptpd,
    rotpd,
    tore,
    dcdp,
    coawridpip,
    tctiotpdatt,
    tm,
    iadr,
    eoadmip,
  } = this;

  if (
    department &&
    pop &&
    nrrftp &&
    tor &&
    toi &&
    topd &&
    tospd &&
    sootpd &&
    lopd &&
    lbfppd &&
    lbfpspd &&
    liop &&
    rpopd &&
    lrtktpd &&
    taosmptpd &&
    rotpd &&
    tore &&
    dcdp &&
    coawridpip &&
    tctiotpdatt &&
    tm &&
    iadr &&
    eoadmip
  ) {
    this.completed = true;
  }

  next();
});

module.exports = mongoose.model('Iopa', iopaSchema);
