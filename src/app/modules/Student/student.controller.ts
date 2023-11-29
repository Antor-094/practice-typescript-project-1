import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.services';



const getAllStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'All the Student get successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const getAsingleStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const id = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Single Student get successfully',
      data: result,
    });
  } catch (error) {
   next(error)
  }
};
const deleteStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const id = req.params.studentId;
    const result = await StudentServices.deleteStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
 
  } catch (error) {
    next(error)
  }
};
export const StudentControllers = {

  getAllStudent,
  getAsingleStudent,
  deleteStudent
};
