import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Product, ProductForm } from "src/app/models/user-service.types";
import { ProductsComponent } from "../products.component";
import { isNil } from 'lodash';
export class ProductsComponentAdapter {
    // static fromDTOtoForm(arg0: ProductsComponent): FormGroup<ProductForm> {
    //   throw new Error('Method not implemented.');
    // }
    static fromDTOtoForm(dto: Product): FormGroup<ProductForm>{
        if(!isNil(dto)){
            return new FormGroup({
                title: new FormControl(dto.title, Validators.required),
                category: new FormControl(dto.category, Validators.required),
                price: new FormControl(dto.price, Validators.required),
                employee: new FormControl(dto.employee),
                description: new FormControl(dto.description),
                reviews: new FormControl(dto.reviews),
            })
        } else {
            return new FormGroup<ProductForm>({
                title: new FormControl("", Validators.required),
                category: new FormControl("", Validators.required),
                price: new FormControl(0, Validators.required),
                employee: new FormControl(""),
                description: new FormControl(""),
                reviews: new FormControl([]),
            });
        }
        
    }

    static validateForm(form:FormGroup): string[] {
        let invalidFileds: string[] = [];
        if (!form.valid) {
            for (let i in form.controls) {
                if(!form.controls[i].valid){
                    invalidFileds.push(i)
                }
            }
        }
        return invalidFileds;
    }
}
