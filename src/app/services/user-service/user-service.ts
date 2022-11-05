
// import {ApiUrls, UrlTemplates} from '@stargazers/services/api/api.constants';
import { Product, StatsCategories, Store } from './user-service.types';
// import {
//   RepositoriesRawResponse,
//   StargazersRawResponse,
//   UsersSearchRawResponse,
// } from './user-service.types';
// import Formatter from '@stargazers/utils/formatter';
import { HttpClient } from '../http-client';
// import { Formatter } from '../utils';
import { ApiUrls } from '../api/api.constants';

export const getStores = () =>
  HttpClient.get<Store[]>(
    ApiUrls.GET_STORES
  );

export const getStore = () =>
  HttpClient.get<Store>(
    ApiUrls.GET_STORE,
  );

export const getProducts = () =>
  HttpClient.get<Product[]>(
    ApiUrls.GET_PRODUCTS,
  );

export const setProducts = () =>
  HttpClient.get<Product[]>(
    ApiUrls.SET_PRODUCTS,
  );

export const getProduct = (idProduct: string) =>
  HttpClient.get<Product>(
    ApiUrls.GET_PRODUCT(idProduct),
  );

export const deleteProduct = (idProduct: string) =>
  HttpClient.get<Product>(
    ApiUrls.DELETE_PRODUCT(idProduct),
  );

export const getStatCategories = () =>
  HttpClient.get<StatsCategories[]>(
    ApiUrls.GET_STAT_CATEGORIES,
  );
// export const getUserRepositories = (owner: string) =>
//   HttpClient.get<RepositoriesRawResponse>(
//     Formatter.injectUrlParam(UrlTemplates.GET_USER_REPOSITORIES, owner),
//   );

// export const getStargazers = (owner: string, repository: string) =>
//   HttpClient.get<StargazersRawResponse>(ApiUrls.GET_REPO_STARGAZERS(owner, repository));
