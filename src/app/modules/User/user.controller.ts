import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating schema validation using zod

    // const zodParseData = StudentJodValidateSchema.parse(studentData);

    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(password, studentData);

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


export const UserControllers = {
  createStudent
}
