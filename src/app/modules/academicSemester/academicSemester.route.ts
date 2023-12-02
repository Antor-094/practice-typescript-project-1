import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicSemesterValidations } from './academicSemesterValidationSchema';

const router = express.Router();

router.post('/create-academic-semester',
    validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema),
    AcademicSemesterControllers.createAcademicSemester);


export const AcademicSemesterRoutes = router;

