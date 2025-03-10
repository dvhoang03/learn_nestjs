import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";
import { CatDTO } from "./cat.dto";

@Controller('cats')
export class CatsController{
  constructor( private catsservice: CatsService){};

  @Get()
  async getAll(): Promise<Cat[]> {
    return this.catsservice.getAll();
  };

  @Post()
  async createCat(@Body() catDto: CatDTO){
    console.log(catDto)
    this.catsservice.createCat(catDto);
  }
  @Get(':id')
  getDetail(@Param('id') id : string): Cat| undefined{
    return this.catsservice.getDetail(id);
  }

  @Put(':id')
  update(@Body() catDto: CatDTO, @Param('id') id: string): Cat{
    return this.catsservice.updateCat(catDto,id);
  }

  @Delete(':id')
  deleteCat(@Param('id') id:string ){
    this.catsservice.deleteCat(id);
  }
}