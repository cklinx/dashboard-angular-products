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
  data:	T[];
}