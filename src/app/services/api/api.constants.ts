const apiUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api';
const idStore = 'ijpxNJLM732vm8AeajMR';

export const ApiUrls = {
  GET_STORES: `${apiUrl}/stores`,
  GET_STORE: `${apiUrl}/stores/${idStore}`,
  // GET_PRODUCTS: `${apiUrl}/stores/${idStore}/products`,
  GET_PRODUCTS: (page: number) => {
    const elem: number = 20;
    return `${apiUrl}/stores/${idStore}/products?page=${page}&elements=${elem}`;
  },
  SET_PRODUCT: `${apiUrl}/stores/${idStore}/products`,
  // GET_PRODUCT: '/stores/{idStore}/products/{idProduct}',
  GET_PRODUCT: (idProduct: string) => {
    return `${apiUrl}/stores/${idStore}/products/${idProduct}`;
  },
  // DELETE_PRODUCT: '/stores/{idStore}/products/{idProduct}',
  DELETE_PRODUCT: (idProduct: string) => {
    return `${apiUrl}/stores/${idStore}/products/${idProduct}`;
  },
  GET_STAT_CATEGORIES: `${apiUrl}/stores/${idStore}/stats/categories`
}