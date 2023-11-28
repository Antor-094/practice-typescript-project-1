import { Request, Response } from 'express';
import { StudentServices } from './student.services';
import StudentJodValidateSchema from './student.Jod.validation';
// import studentValidationJoiSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating schema validation using zod

    const { student: studentData } = req.body;

    const zodParseData = StudentJodValidateSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'All the Student get successfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error,
      });
  }
};

const getAsingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Single Student get successfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error,
      });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.studentId;
    const result = await StudentServices.deleteStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error,
      });
  }
};
export const StudentControllers = {
  createStudent,
  getAllStudent,
  getAsingleStudent,
  deleteStudent
};
