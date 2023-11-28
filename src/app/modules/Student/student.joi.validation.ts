//Creating a schema validation using joi
// Joi schema for username
import Joi from 'joi';
const usernameValidationJoiSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .trim()
    .regex(/^[A-Z][a-z]*$/)
    .message('{VALUE} is not capitalized format'),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .required()
    .trim()
    .regex(/^[A-Za-z]+$/)
    .message('{VALUE} is not valid'),
});

// Joi schema for guardian
const guardianValidationJoiSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

// Joi schema for localTGuardian
const localTGuardianValidationJoiSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Joi schema for student
const studentValidationJoiSchema = Joi.object({
  id: Joi.string().required(),
  name: usernameValidationJoiSchema.required(),
  gender: Joi.string().valid('male', 'female').required(),
  dateOfBirth: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationJoiSchema.required(),
  localTGuardian: localTGuardianValidationJoiSchema.required(),
  profileImage: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationJoiSchema;
