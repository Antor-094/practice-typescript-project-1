
import { Student } from './student.models';



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
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
