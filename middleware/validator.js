const Joi = require('joi');

const createStudentSchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .pattern(new RegExp("^[\\p{L}]+([\\s'\\-\\.][\\p{L}]+)*$", "u"))
    .min(3)
    .required()
    .messages({
      'any.required': 'Student full name must be entered.',
      'string.empty': 'Student full name cannot be empty.',
      'string.min': 'Student full name must be at least 3 characters long.',
      'string.pattern.base':  "Fullname must contain only letters, spaces, hyphens, apostrophes, and periods"
    }),

  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      'any.required': 'Student email is required.',
      'string.empty': 'Student email cannot be empty.',
      'string.email': ' enter a valid student email address.',
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^(?:\+234|0)\d{10}$|^\+?\d{10,15}$/)
    .required()
    .messages({
      'any.required': 'Phone number is required.',
      'string.empty': 'Phone number cannot be empty.',
      'string.pattern.base': ' enter a valid phone number'
    }),

  department: Joi.string()
    .trim()
    .min(2)
    .required()
    .messages({
      'any.required': 'Department is required.',
      'string.empty': 'Department cannot be empty.',
      'string.min': 'Department must be at least 2 characters long.',
    }),
});

const createStudentValidation = (req, res, next) => {
  const { error, value } = createStudentSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const files = req.files || {};

  if (!files.profileImage || files.profileImage.length === 0) {
    return res.status(400).json({ message: 'Profile image is required.' });
  }

  if (!files.galleryImages || files.galleryImages.length === 0) {
    return res.status(400).json({ message: 'At least one gallery image is required.' });
  }

  if (!files.passportImage || files.passportImage.length === 0) {
    return res.status(400).json({ message: 'Passport image is required.' });
  }

  if (!files.identityCardImage || files.identityCardImage.length === 0) {
    return res.status(400).json({ message: 'Identity card image is required.' });
  }

  req.body = value;
   next();
};

module.exports = { createStudentValidation };