import { Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './schema/employee.schema';

@Controller('employee')
export class EmployeeController {
    constructor (readonly employeeService: EmployeeService) {} 

    @Post()
    async createEmployee(): Promise<Employee>{
        return this.employeeService.createEmployee();
    }  

    @Get() 
    async get(): Promise<Employee[]>{
        return this.employeeService.get();
    }
}
