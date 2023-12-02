import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemester } from "./academicSemester.model";


const createAcademicSemesterIntoDB = async(payLoad:TAcademicSemester)=>{

    const result = await academicSemester.create(payLoad)
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}