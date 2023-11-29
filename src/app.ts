
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/Student/student.route';
import { UserRoutes } from './app/modules/User/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
const app: Application = express();
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

//Global error handler

app.use(globalErrorHandler)


export default app;
