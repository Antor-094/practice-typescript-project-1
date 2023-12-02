import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicSemesterValidations } from './academicSemesterValidationSchema';

const router = express.Router();

router.post('/create-academic-semester',
    validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema),
    AcademicSemesterControllers.createAcademicSemester);
router.get('/', AcademicSemesterControllers.getAllAcademicSemester)
router.get('/:semesterId', AcademicSemesterControllers.getSingleSemester)
router.put('/:semesterId', validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterControllers.updateSingleSemester)

export const AcademicSemesterRoutes = router;

