import { Request, Response } from 'express';
import { StudentServices } from './student.services';
import studentValidationJoiSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
    try {


        const { student: studentData } = req.body;
        const { error, value } = studentValidationJoiSchema.validate(studentData)
        // console.log({error},{value})
        const result = await StudentServices.createStudentIntoDB(value);
        
        if (error) {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error.details,
            });
        }
        res.status(200).json({
            success: true,
            message: 'Student created successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
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
    } catch (error) {
        console.log(error);
    }
};

const getAsingleStudent = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await StudentServices.getSingleStudentFromDB(id);
        res.status(200).json({
            success: true,
            message: 'Single Student get successfully',
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
};
export const StudentControllers = {
    createStudent,
    getAllStudent,
    getAsingleStudent,
};
