import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { unsafeMethods } from 'tools/variables';


const $api = axios.create({
   withCredentials: true,
   baseURL: 'http://localhost:8000/',
});

$api.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) { config.headers['Authorization'] = `Bearer ${token}`; }

      if (unsafeMethods.includes(config.method as string)) {
         config.headers['X-CSRFToken'] = Cookies.get('csrftoken');
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
 );
 
$api.interceptors.response.use(
   (res) => {
      return res;
   },
   async (err: AxiosError) => {
      const originalConfig = err.config;
      if (originalConfig.url !== 'token/obtain/' && err.response) {
         // Access Token was expired
         if (err.response.status === 401) {
            try {
               type ResponseType = { access: string, refresh: string }
               const { data: { access, refresh } } = await $api.post<ResponseType>(
                  'token/refresh/', {refresh: localStorage.getItem('refreshToken')}
               );
               localStorage.setItem('accessToken', access);
               localStorage.setItem('refreshToken', refresh);
               return $api(originalConfig);
            } catch (_error) {
               return Promise.reject(_error);
            }
         }
      }
      return Promise.reject(err);
   }
 );

 export default $api;