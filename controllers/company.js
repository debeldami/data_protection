const asyncHandler = require('../utils/asyncHandler.js');
const Company = require('../models/company.js');

/**
 * @description create a bootcamp account
 * @route Get api/company/
 * @access Public
 */
exports.registerCompany = asyncHandler(async (req, res, next) => {
  const { name, email, password, nopa } = req.body;

  const company = await Company.create({
    name,
    email,
    password,
    nopa,
  });

  res.status(200).json({
    success: true,
    data: company,
  });
});
