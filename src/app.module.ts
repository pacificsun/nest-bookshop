import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BooksModule  } from './books/books.module'

@Module({
  imports: [ BooksModule, MongooseModule.forRoot("mongodb+srv://developer:IZ2acz3iWdpmw7Im@nestdevopscluster.gdfyt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
