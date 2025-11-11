import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schema/employee.schema';
import { Profile } from './schema/profile.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeService {
    constructor (
        @InjectModel(Employee.name) private employeeModel: Model<Employee>,
        @InjectModel(Profile.name) private profileModel: Model<Profile>
    ) {}   


    async createEmployee(): Promise<Employee>{
         const profile = await new  this.profileModel({
            age: 23,
            qualification: 'BSCS',
         }).save();

         const employee = new this.employeeModel({
            name: "Yash",
            profile: profile._id
         })
         return employee.save();
    }   

    async get(): Promise<Employee[]>{
        return this.employeeModel.find().populate('profile');
    }
}
