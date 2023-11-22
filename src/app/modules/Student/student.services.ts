import { Student } from './student.interface';
import { StudentModel } from './student.models';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  console.log({ id });

  const result = await StudentModel.findOne({ _id: new Object(id) });
  return result;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
