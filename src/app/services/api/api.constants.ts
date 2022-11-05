// export const UrlTemplates = {
//   SEARCH_USERS: '/search/users?q={query}',
//   GET_USER_REPOSITORIES: '/users/{owner}/repos',
// };

// export const ApiUrls = {
//   GET_REPO_STARGAZERS: (owner: string, repository: string) => {
//     return `repos/${owner}/${repository}/stargazers`;
//   },
// };
export const idStore = 'ijpxNJLM732vm8AeajMR';

export const ApiUrls = {
  GET_STORES: `/stores`,
  GET_STORE: `/stores/${idStore}`,
  GET_PRODUCTS: `​/stores​/${idStore}​/products`,
  SET_PRODUCTS: `/stores/${idStore}/products`,
  // GET_PRODUCT: '/stores/{idStore}/products/{idProduct}',
  GET_PRODUCT: (idProduct: string) => {
    return `/stores/${idStore}/products/${idProduct}`;
  },
  // DELETE_PRODUCT: '/stores/{idStore}/products/{idProduct}',
  DELETE_PRODUCT: (idProduct: string) => {
    return `/stores/${idStore}/products/${idProduct}`;
  },
  GET_STAT_CATEGORIES: `/stores/${idStore}/stats/categories`
}