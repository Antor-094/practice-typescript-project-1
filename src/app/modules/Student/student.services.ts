import { TStudent } from './student.interface';
import { Student } from './student.models';

const createStudentIntoDB = async (studentData: TStudent) => {
  //custom static method call korram
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists man');
  }
  const result = await Student.create(studentData); //build in static method

  // for creating instance method
  // const student = new Student(studentData)
  // if(await student.isUserExists(studentData.id)){
  //   throw new Error("User already exists")
  // }
  // const result = await student.save();//build in instance method
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  // console.log({ id });

  // const result = await Student.findOne( {id});
  const result = await Student.aggregate([
    {$match:{id:id}}
  ])
  return result;
};
const deleteStudentFromDB = async (id: string) => {
// console.log(studentId)
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
}
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
