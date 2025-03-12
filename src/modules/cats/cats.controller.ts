import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";
import { CatDTO } from "./cat.dto";
import { Public } from "../public_routes/public";

@Controller('cats')
export class CatsController{
  constructor( private catsservice: CatsService){};

  @Public()
  @Get()
  async getAll(): Promise<Cat[]> {
    return this.catsservice.getAll();
  };

  @Public()
  @Post()
  async createCat(@Body() catDto: CatDTO){
    console.log(catDto)
    this.catsservice.createCat(catDto);
  }
  @Public()
  @Get(':id')
  getDetail(@Param('id') id : string): Cat| undefined{
    return this.catsservice.getDetail(id);
  }

  @Public()
  @Put(':id')
  update(@Body() catDto: CatDTO, @Param('id') id: string): Cat{
    return this.catsservice.updateCat(catDto,id);
  }

  @Public()
  @Delete(':id')
  deleteCat(@Param('id') id:string ){
    this.catsservice.deleteCat(id);
  }
}