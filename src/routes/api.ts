import axios from 'axios';
import { identityServerConfig } from '../config';
import { LoginPayload, MessageResponse } from '../types';

const headers = {
  Authorization: `Bearer ${identityServerConfig.ccardIdentityServerApikey}`,
  'Content-Type': 'application/json',
};

export const apiLogin = async (payload: LoginPayload): Promise<boolean> => {
  try {
    const response = await axios.post<MessageResponse>(
      `${identityServerConfig.ccardIdentityServerUri}/api/citizens/login`,
      payload,
      {
        headers,
      }
    );
    console.log(response);
    return (response.data as MessageResponse).message === 'authorized';
  } catch (error) {
    return false;
  }
};
