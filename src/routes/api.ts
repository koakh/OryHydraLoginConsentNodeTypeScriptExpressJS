import axios from 'axios';
import { identityServerConfig } from '../config';
import { LoginPayload, MessageResponse } from '../types';

const headers = {
  Authorization: `Bearer ${identityServerConfig.ccardIdentityServerApikey}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function apiLogin(payload: LoginPayload) {
  try {
    // 👇️ const data: CreateUserResponse
    const { data } = await axios.post<MessageResponse>(
      `${identityServerConfig.ccardIdentityServerUri}/api/citizens/login`,
      payload,
      {
        headers,
      }
    );
    // console.log(JSON.stringify(data, null, 4));
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
