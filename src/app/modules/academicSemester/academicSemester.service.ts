import { academicSemesterNameCodeMapper } from "./academicSemester.Constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";


const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
    // Autumn code 01
    //Summer code 02
    //Fall code 03
    //business er logic gula service ey lekbo
    //checking semester name ----> semester code
    if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
        throw new Error('Invalid Semester Code')
    }
    const result = await AcademicSemester.create(payLoad)
    return result
}

const getAllAcademicSemesterFromDB = async()=>{

    const result = await AcademicSemester.find()
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB
}