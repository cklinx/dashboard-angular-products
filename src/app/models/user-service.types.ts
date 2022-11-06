import { FormControl } from "@angular/forms";

export interface Product {
  title: string;
  category:	string;
  price: number;
  employee: string;
  description: string;
  reviews: string[];
}

export interface Store {
  name:	string;
  category:	string;
  employees:	string[];
}

export interface StatsCategories {
  numberOfProducts:	number;
  category:	string;
}

export interface WrapperData<T> {
  id:	string;
  data:	T;
}

export interface WrapperDataList<T> {
  list: T[];
  length: number;
}

export enum ModeDialog {
  Edit = 'edit',
  New = 'new',
  Delete = 'delete',
  View = 'view'
}

export interface ProductForm {
  title:	FormControl<string>;
  category:	FormControl<string>;
  price:	FormControl<number>;
  employee:	FormControl<string>;
  description: FormControl<string>;
  reviews: FormControl<string[]>;
}