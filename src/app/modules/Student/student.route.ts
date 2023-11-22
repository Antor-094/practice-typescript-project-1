import express from 'express';
import { StudentControllers } from './student.controller';
const router = express.Router();

router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudent);
router.get('/:id', StudentControllers.getAsingleStudent);

export const StudentRoutes = router;
