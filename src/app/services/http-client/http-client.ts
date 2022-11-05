import axios from 'axios';

const config = {
  baseURL: 'http://us-central1-test-b7665.cloudfunctions.net/api',
  // headers: {
  //   'client-app-version': APP_VERSION,
  //   'client-os-version': OS_VERSION,
  // },
};
const instance = axios.create(config);
export default instance;
