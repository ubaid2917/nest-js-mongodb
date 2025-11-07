import { Controller, Post, Get } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
    constructor (readonly libraryService: LibraryService) {}

    @Post()
    async createLibrary () {
        return this.libraryService.createLibrary();
    }  

    @Get()
    async getLibraries () {
        return this.libraryService.getLibraries();
    }
}
