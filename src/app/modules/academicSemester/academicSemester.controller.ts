
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';
const createAcademicSemester = catchAsync(async (req, res) => {

  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemester created successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(
  async(req,res)=>{
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'All the semester get successfully',
      data:result
    })
  }
)
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester
};
