import $api from 'http-requests';
import { AxiosResponse } from 'axios';


export default class AuthService {
   static async me(): Promise<AxiosResponse<UserType>> {
      return $api.get('me/');
   }
   
   static async signIn(user: SignInUserType): Promise<AxiosResponse<TokensType>> {
      return $api.post('token/obtain/', { ...user });
   }

   static async refresh(): Promise<AxiosResponse<TokensType>> {
      return $api.post('token/refresh/', { refresh: localStorage.getItem('refreshToken') });
   }

   static async signUp(user: SignUpUserType): Promise<AxiosResponse<void>> {
      return $api.post('register/', { ...user });
   }
};