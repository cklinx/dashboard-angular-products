import { ApiUrls } from '../api/api.constants';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { catchError } from 'rxjs/operators';
import { Product, StatsCategories, Store, WrapperData, WrapperDataList } from 'src/app/models/user-service.types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export default class HttpService {

  private handleError: HandleError;
  
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('HttpService');
  }

  getStores = () =>
    this.http.get<WrapperData<Store>>(
      ApiUrls.GET_STORES
    ).pipe(
      catchError(this.handleError('getStores', []))
    );

  getStore = () =>
    this.http.get<Store>(
      ApiUrls.GET_STORE,
    ).pipe(
      catchError(this.handleError('getStore', []))
    );

  getProducts = (page: number) =>
    this.http.get<WrapperData<Product>[]>(
      ApiUrls.GET_PRODUCTS(page),
    ).pipe(
      catchError(this.handleError('getProducts', []))
    );

  getProductsPaged = (page: number) =>
    this.http.get<WrapperDataList<WrapperData<Product>>>(
      ApiUrls.GET_PRODUCTS(page),
    ).pipe(
      catchError(this.handleError('getProducts', []))
    );

  setProduct = (product: Product) =>
    this.http.post<string>(
      ApiUrls.SET_PRODUCT,
      product,
      httpOptions
    ).pipe(
      catchError(this.handleError('setProduct', []))
    );

  getProduct = (idProduct: string) =>
    this.http.get<Product>(
      ApiUrls.GET_PRODUCT(idProduct),
    ).pipe(
      catchError(this.handleError('getProduct', []))
    );

  deleteProduct = (idProduct: string) =>
    this.http.delete<Product>(
      ApiUrls.DELETE_PRODUCT(idProduct),
    ).pipe(
      catchError(this.handleError('deleteProduct', []))
    );

  getStatCategories = () =>
    this.http.get<WrapperData<StatsCategories>[]>(
      ApiUrls.GET_STAT_CATEGORIES,
    ).pipe(
      catchError(this.handleError('getStatCategories', []))
    );
}