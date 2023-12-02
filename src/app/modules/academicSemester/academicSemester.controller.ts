
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

const getSingleSemester = catchAsync(
  async(req,res)=>{
     const id = req.params.semesterId ;
     const result = await AcademicSemesterServices.getSingleSemesterFromDB(id)
     sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'single semester get successfully',
      data:result
     })
  }
)
const updateSingleSemester = catchAsync(
  async(req,res)=>{
     const id = req.params.semesterId;
     const updatedData = req.body
     const result = await AcademicSemesterServices.updateSingleSemesterFromDB(id,updatedData)
     sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'single semester updated successfully',
      data:result
     })
  }
)
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleSemester,
  updateSingleSemester
};
