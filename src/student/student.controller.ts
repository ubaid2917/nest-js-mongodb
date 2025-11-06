import { Body, Controller, Get, Param, Post, UsePipes, ParseUUIDPipe, Patch, Delete, } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.schema';


@Controller('student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService
    ) {}
 
    @Post()
    async addStudent(
        @Body() data: Partial<Student>){
       return this.studentService.create(data);
    }   

    @Get() 
    async getStudent(){
        return this.studentService.get();
    }

    @Get(':id')
    async getStudentById(@Param('id') id: string) {
    return this.studentService.getById(id);
    }
    

    @Patch(':id') 
    async updateStudent( 
        @Param('id', new ParseUUIDPipe({version: '4', })) id : string,
        @Body() data: Partial<Student>){
        return this.studentService.updateData(id, data)
    }

    @Delete(':id')
    async deleteData(@Param('id') id: string){
        return this.studentService.deleteData(id)
    }
}
