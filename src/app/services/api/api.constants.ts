// export const UrlTemplates = {
//   SEARCH_USERS: '/search/users?q={query}',
//   GET_USER_REPOSITORIES: '/users/{owner}/repos',
// };

// export const ApiUrls = {
//   GET_REPO_STARGAZERS: (owner: string, repository: string) => {
//     return `repos/${owner}/${repository}/stargazers`;
//   },
// };
const apiUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api';
const idStore = 'ijpxNJLM732vm8AeajMR';

export const ApiUrls = {
  GET_STORES: `${apiUrl}/stores`,
  GET_STORE: `${apiUrl}/stores/${idStore}`,
  GET_PRODUCTS: `${apiUrl}/stores/${idStore}/products`,
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