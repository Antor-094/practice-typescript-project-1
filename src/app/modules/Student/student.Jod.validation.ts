import { z } from 'zod';

const TUserNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => value.charAt(0).toUpperCase() === value.charAt(0), {
      message: '{VALUE} is not capitalized format',
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .max(20)
    .min(1)
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: '{VALUE} is not valid',
    }),
});

const TGuardianSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const TLocalGuardianSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const StudentJodValidateSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: TUserNameSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: TGuardianSchema,
  localGuardian: TLocalGuardianSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default StudentJodValidateSchema;
