import express from 'express';
import { UserControllers } from './user.controller';

import { studentValidations } from '../Student/student.Jod.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();


router.post('/create-student', validateRequest(studentValidations.CreateStudentJodValidateSchema), UserControllers.createStudent);

export const UserRoutes = router;
