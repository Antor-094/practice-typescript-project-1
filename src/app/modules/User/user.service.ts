import config from "../../config";
import { TStudent } from "../Student/student.interface";
import { Student } from "../Student/student.models";
import { TUser } from "./user.interface";
import { User } from "./user.models";

const createStudentIntoDB = async (password: string,studentData:TStudent) => {

  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given use default password
  userData.password = password || (config.default_password as string)

 //set student role
  userData.role = 'student'

 // set manually generated id
 userData.id = '2030100001'


  const newUser = await User.create(userData); 

  //create a student
  if(Object.keys(newUser).length){
    //set id and _id as user
    studentData.id = newUser.id//embedding id
    studentData.user = newUser._id//reference id
  }
  
  const newStudent = await Student.create(studentData)
  return newStudent
};

export const UserServices = {
  createStudentIntoDB
}