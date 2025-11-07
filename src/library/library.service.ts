import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Library } from './schema/library.schema';
import { Model } from 'mongoose';
import { Book } from './schema/book.schema';

@Injectable()
export class LibraryService {
    constructor (
        @InjectModel(Book.name) private readonly  bookModel: Model<Book>,
        @InjectModel(Library.name) private readonly libraryModel: Model<Library>,
    ) {}


    async createLibrary (): Promise<Library> {
         const book1 = await this.bookModel.create({
             title: "book1",
             author: "Obaid"
         })
         const book2 = await this.bookModel.create({
             title: "book2",
             author: "Ubaid"
         })  

         const library = await this.libraryModel.create({
             name: "library1",
             books: [book1._id, book2._id]
         })
         return library.save();
    }   


    async getLibraries (): Promise<Library[]>{
        return this.libraryModel.find().populate('books');
    }
}
