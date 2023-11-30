import { StudentServices } from './student.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All the Student get successfully',
    data: result,
  });
});

const getAsingleStudent = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const result = await StudentServices.getSingleStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student get successfully',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const result = await StudentServices.deleteStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});
export const StudentControllers = {
  getAllStudent,
  getAsingleStudent,
  deleteStudent,
};
