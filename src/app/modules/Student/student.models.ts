import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
import validator from 'validator';

// import {  boolean } from 'joi';
const usernameSchema = new Schema<TUserName>({
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

const guardianSchema = new Schema<TGuardian>({
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
const TlocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'LocalTGuardian Name is required!!'] },
  occupation: {
    type: String,
    required: [true, 'LocalTGuardian occupation is required!!'],
  },
  contactNo: {
    type: String,
    required: [true, 'LocalTGuardian contactNo is required!!'],
  },
  address: {
    type: String,
    required: [true, 'LocalTGuardian address is required!!'],
  },
});
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'Id is requied'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'Use Id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: usernameSchema,
      required: [true, 'Name is required!!'],
    },
    //union type er moton mongoose o ekta type ase enum
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, 'email is required!!'],
      unique: true,
      trim: true,
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
      type: TlocalGuardianSchema,
      required: [true, 'localTGuardian is required!!'],
    },
    profileImage: {
      type: String,
      required: [true, 'profileImage is required!!'],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// implementing query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});
// creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser;
// }
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
