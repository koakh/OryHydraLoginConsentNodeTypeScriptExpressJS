import axios, { AxiosResponse } from 'axios';
import { identityServerConfig } from '../config';
import { LoginPayload, MessageResponse } from '../types';

const headers = {
  Authorization: `Bearer ${identityServerConfig.ccardIdentityServerApikey}`,
  'Content-Type': 'application/json',
};

// export const apiLogin = async (payload: LoginPayload): Promise<boolean> => {
//   try {
//     console.log(`payload: [${JSON.stringify(payload, undefined, 2)}]`);
//     const response = await axios.post<MessageResponse>(
//       `${identityServerConfig.ccardIdentityServerUri}/api/citizens/login`,
//       payload,
//       {
//         headers,
//       }
//     );
//     console.log(`response: [${JSON.stringify(response, undefined, 2)}]`);
//     return response.data.message === 'authorized';
//   } catch (error) {
//     console.error(`error: ${JSON.stringify(error, undefined, 2)}`);
//     return false;
//   }
// };

export const apiLogin = (payload: LoginPayload): boolean => {
  console.log(`payload: [${JSON.stringify(payload, undefined, 2)}]`);
  axios
    .post<MessageResponse>(
      `${identityServerConfig.ccardIdentityServerUri}/api/citizens/login`,
      payload,
      {
        headers,
      }
    )
    .then((data: AxiosResponse<MessageResponse, any>) => {
      console.log(`data: [${JSON.stringify(data, undefined, 2)}]`);
      return false;
    })
    .catch((error) => {
      console.log(`error: [${JSON.stringify(error, undefined, 2)}]`);
      return false;
    });
  return true;
};
