import { Injectable } from "@nestjs/common";
import { Cat } from "./interfaces/cat.interface";
import { CatDTO } from "./cat.dto";

@Injectable()
export class CatsService{
    private cats: Cat[] =[];

    getAll(): Cat[]{
        return this.cats;
    }

    getDetail(id:string): Cat |undefined{
         const cat = this.cats.find(cat => cat.id === Number(id));
         return cat
    }

    createCat( catDTO: CatDTO):void{
        const cat = {
            id: Math.floor(Math.random() * (100)) + 1,
            ...catDTO
        }
        this.cats.push(cat);
    }

    updateCat(cat: CatDTO, id : string): Cat{
        const index = this.cats.findIndex(cat => cat.id === Number(id));

        // Kiểm tra xem có tìm thấy hay không

        // Cập nhật thông tin
        this.cats[index] = {
            id: Number(id),
            ...cat
        };
            return this.cats[index]
        }

    deleteCat( id: string){
        var index= this.cats.findIndex( cat => cat.id === Number(id));
        this.cats.splice(index,1);
    }
}
