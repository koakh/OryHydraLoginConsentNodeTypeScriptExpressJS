import axios, { AxiosResponse } from 'axios';
import { identityServerConfig } from '../config';
import { LoginPayload, MessageResponse } from '../types';

const headers = {
  Authorization: `Bearer ${identityServerConfig.ccardIdentityServerApikey}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
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
    console.log(JSON.stringify(data, null, 4));
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      // 👇️ error: AxiosError<any, any>
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

// export const apiLogin = async (
//   payload: LoginPayload
// ): Promise<boolean | void> => {
//   // const article = { title: 'Axios POST Request Example' };
//   const { data } = axios
//     .post<MessageResponse>(
//       `${identityServerConfig.ccardIdentityServerUri}/api/citizens/login`,
//       payload,
//       { headers }
//     )
//     .catch((error) => {
//       console.error(error);
//       return false;
//     });
//   // console.log(`response: [${JSON.stringify(response, undefined, 2)}]`);
//   return (response as any)?.data.message === 'authorized';

//   // console.log(`payload: [${JSON.stringify(payload, undefined, 2)}]`);
//   // axios
//   //   .post<MessageResponse>(
//   //     `${identityServerConfig.ccardIdentityServerUri}/api/citizens/login`,
//   //     payload,
//   //     {
//   //       headers,
//   //     }
//   //   )
//   //   .then((data: AxiosResponse<MessageResponse, any>) => {
//   //     console.log(`data: [${JSON.stringify(data, undefined, 2)}]`);
//   //     return true;
//   //   })
//   //   .catch((error) => {
//   //     console.log(`error: [${JSON.stringify(error, undefined, 2)}]`);
//   //     return false;
//   //   });
//   // return true;
// };
