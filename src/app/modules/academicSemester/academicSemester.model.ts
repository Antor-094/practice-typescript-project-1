import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.Constant";


const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            enum: AcademicSemesterName,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        code: {
            type: String,
            enum: AcademicSemesterCode,
            required: true
        }
        ,
        startMonth: {
            type: String,
            enum: Months,
            required: true
        },
        endMonth: {
            type: String,
            enum: Months,
            required: true
        }
    }, {
    timestamps: true
}
)

//pre document middleware for year check. we can not create a same semester in same year two times

academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExists = await AcademicSemester.findOne({
        year:this.year,
        name:this.name
    })
    if(isSemesterExists){
        throw new Error('Semester is already exists')
    }
    next()
})


export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema) 