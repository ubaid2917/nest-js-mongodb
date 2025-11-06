import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Student, StudentDocument} from './student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
   constructor(
  @InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>
) {}


   async create(data: Partial<Student>): Promise<Student> {
      const newStudent = await this.studentModel.create(data);
      return await newStudent.save();     
    } 


    async get(): Promise<Student[]>{
        return this.studentModel.find();
    } 

    async getById(id: string): Promise<Student | null> {
       return this.studentModel.findById(id);
    }  

    async updateData(id: string, data: Partial<Student>): Promise<Student | null> {
      return this.studentModel.findByIdAndUpdate(id, data, { new: true });
    }  

    async deleteData(id:string) : Promise<Student | null> {
      const data = await this.studentModel.findByIdAndDelete(id); 
      if(!data){
        throw new NotFoundException("Data not found");
      }
      return data
    }
}
