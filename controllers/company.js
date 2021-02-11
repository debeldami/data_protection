const asyncHandler = require('../utils/asyncHandler.js');
const Company = require('../models/company.js');
const ErrorResponse = require('../utils/error.js');

/**
 * @description create a company account
 * @route post api/company/register
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

  sendTokenResponse(company, 200, res);
});

/**
 * @description signin to a company account
 * @route post api/company/signin
 * @access Public
 */
exports.signinCompany = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  console.log(validateEmail.test(email));

  //validate email and password
  if (!email || !password || !validateEmail.test(email)) {
    return next(
      new ErrorResponse('please provide a valid email and password', 404)
    );
  }

  //check for user
  const company = await Company.findOne({ email }).select('+password');

  if (!company) {
    return next(new ErrorResponse('invalid credentials', 401));
  }

  //check if password matches
  const isMatch = await company.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('invalid credentials', 401));
  }

  sendTokenResponse(company, 200, res);
});

//get token, create cookies and send response
const sendTokenResponse = (company, stausCode, res) => {
  //create token from static method created in user model
  const token = company.getSignedJwtToken();

  //expires for expire date
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(stausCode).cookie('token', token, options).json({ success: true });
};
