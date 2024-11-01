const yup = require('yup');

module.exports.USER_VALIDATION_SCHEMA = yup.object({
  username: yup
    .string()
    .required()
    .min(3)
    .max(32)
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'User name must be alphanumeric and can include underscores'
    ),
  password: yup
    .string()
    .required()
    .min(6)
    .max(20)
    .matches(
      /(?=.*[a-z])/,
      'Password must include at least one lowercase letter'
    )
    .matches(/(?=.*[A-Z])/, 'Password must include at one uppercase letter')
    .matches(/(?=.*\d)/, 'Password must include at one number')
    .matches(
      /(?=.*[@$!%*?&])/,
      'Password must include at least one special character'
    ),
});
