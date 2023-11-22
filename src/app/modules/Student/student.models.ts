import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';
import validator from 'validator';
const usernameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required!!'],
    maxlength: [20, 'First Name can not be more then 20 characters'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalized format',
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last Name is required!!'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, 'fatherName is required!!'] },
  fatherOccupation: {
    type: String,
    required: [true, 'fatherOccupation is required!!'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'fatherContactNo is required!!'],
  },
  motherName: { type: String, required: [true, 'motherName is required!!'] },
  motherOccupation: {
    type: String,
    required: [true, 'motherOccupation is required!!'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'motherContactNo is required!!'],
  },
});
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, 'LocalGuardian Name is required!!'] },
  occupation: {
    type: String,
    required: [true, 'LocalGuardian occupation is required!!'],
  },
  contactNo: {
    type: String,
    required: [true, 'LocalGuardian contactNo is required!!'],
  },
  address: {
    type: String,
    required: [true, 'LocalGuardian address is required!!'],
  },
});
const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: usernameSchema,
    required: [true, 'Name is required!!'],
  },
  //union type er moton mongoose o ekta type ase enum
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: { type: String, required: [true, 'dateOfBirth is required!!'] },
  email: {
    type: String,
    required: [true, 'email is required!!'],
    unique: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid',
    },
  },
  contactNo: { type: String, required: [true, 'contactNo is required!!'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'emergencyContactNo is required!!'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'presentAddress is required!!'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'permanentAddress is required!!'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'guardian is required!!'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'localGuardian is required!!'],
  },
  profileImage: {
    type: String,
    required: [true, 'profileImage is required!!'],
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
