import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './modules/cats/cats.service';
import { Cat } from './modules/cats/interfaces/cat.interface';

@Controller('hello')
export class AppController {
  // constructor(private readonly appService: AppService) {}

  constructor( private readonly catService:CatsService){}

  @Get()
  getHello(): Cat[] {
    return this.catService.getAll();
  }
}
