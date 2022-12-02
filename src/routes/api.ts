import axios from 'axios';
import { identityServerConfig } from '../config';
import { CitizenDto, LoginPayload, MessageResponse } from '../types';

const headers = {
  Authorization: `Bearer ${identityServerConfig.ccardIdentityServerApikey}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const apiLogin = async (payload: LoginPayload) => {
  try {
    const { data } = await axios.post<MessageResponse>(
      `${identityServerConfig.ccardIdentityServerUri}/api/citizens/login`,
      payload,
      {
        headers,
      }
    );
    // console.log(JSON.stringify(data, null, 2));
    // return data.message = 'authorized';
    // thrust status code 200, and fails on status code 401, better than string message 'authorized'
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error message: ', error.message);
      // 👇️ error: AxiosError<any, any>
      // return error.message;
      return false;
    } else {
      // console.error('unexpected error: ', error);
      // return 'An unexpected error occurred';
      return false;
    }
  }
}

export const apiGetCitizenByTaxNo = async (username: string): Promise<CitizenDto> => {
  try {
    const { data } = await axios.get<any>(
      // don't pass » in get else 404 not found happens, use %C2%BB
      `${identityServerConfig.ccardIdentityServerUri}/api/citizens/tax_no/%C2%BB${username}`,
      {
        headers,
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error message: ', error.message);
      // 👇️ error: AxiosError<any, any>
      throw new Error(error.message);
    } else {
      // console.error('unexpected error: ', error);
      throw new Error('An unexpected error occurred');
    }
  }
}
