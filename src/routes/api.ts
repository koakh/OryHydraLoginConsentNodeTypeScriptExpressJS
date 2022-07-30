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
    console.log(`response: [${JSON.stringify(response, undefined, 2)}]`);
    console.log(`payload: [${JSON.stringify(payload, undefined, 2)}]`);
    return response.data.message === 'authorized';
  } catch (error) {
    return false;
  }
};
