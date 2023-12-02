import config from '../../config';
import { TStudent } from '../Student/student.interface';
import { Student } from '../Student/student.models';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TUser } from './user.interface';
import { User } from './user.models';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  //year  semesterCode  4 digit number
 


//find academic semester info

const admissionSemester = await AcademicSemester.findById(payLoad.admissionSemester);

if (admissionSemester) {
   // set generated id
    userData.id = generateStudentId(admissionSemester);
} else {
   throw new Error('Academic semester not found')
}
 


  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    //set id and _id as user
    payLoad.id = newUser.id; //embedding id
    payLoad.user = newUser._id; //reference id
  }

  const newStudent = await Student.create(payLoad);
  return newStudent;
};

export const UserServices = {
  createStudentIntoDB,
};
