const mongoose = require('mongoose');

const iopaSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: true,
    },
    // nop: {
    //   type: String,
    //   required: [true, 'Please fill in the name of person'],
    // },
    // jt: {
    //   type: String,
    //   required: [true, 'Please fill in the job title'],
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Iopa', iopaSchema);
