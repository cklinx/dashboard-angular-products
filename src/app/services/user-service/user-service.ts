import { Product, StatsCategories, Store, WrapperData } from '../../models/user-service.types';
import { ApiUrls } from '../api/api.constants';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { catchError } from 'rxjs/operators';

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

  getProducts = () =>
    this.http.get<Product[]>(
      ApiUrls.GET_PRODUCTS,
    ).pipe(
      catchError(this.handleError('getProducts', []))
    );

  setProduct = (product: Product) =>
    this.http.post<Product>(
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