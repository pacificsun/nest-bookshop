import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './interface/book.interface';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find({});
  }

  async find(id: string): Promise<Book> {
    return await this.bookModel.findOne({ _id: id });
  }

  async create(book: Book): Promise<Book> {
    const newbook = new this.bookModel(book);
    return await newbook.save();
  }

  async update(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, { new: true });
  }

  async delete(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndRemove(id);
  }
}
