/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudent = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All the Student get successfully',
    data: result,
  });
});

const getAsingleStudent = catchAsync(async (req, res, next) => {
  const id = req.params.studentId;
  const result = await StudentServices.getSingleStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student get successfully',
    data: result,
  });
});
const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
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
