import express from 'express'
import url from 'url'
import csrf from 'csurf'
import axios, { AxiosError } from 'axios'

// Sets up csrf protection
const csrfProtection = csrf({ cookie: true })
const router = express.Router()

type TodoSuccessResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type TodoErrorResponse = {
  error: string;
};

router.get('/', csrfProtection, async (req, res, next) => {
  // Parses the URL query
  const query = url.parse(req.url, true).query

  // The challenge is used to fetch information about the logout request from ORY Hydra.
  const activationCode = String(query.code)
  if (!activationCode) {
    next(new Error('Expected a activation code to be set but received none.'))
    return
  }

  // If authentication can't be skipped we MUST show the login UI.
  // res.render('activation', {
  //   message: 'Activation code stub',
  //   subMessage: 'work in progress'
  // })

  try {
    const response = await axios.get<TodoSuccessResponse>(
      "https://jsonplaceholder.typicode.com/toados/1"
    )
    // .catch(function (error) {
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log('Error', error.message);
    //   }
    //   console.log(error.config);
    // });

    console.log(response.data);

    res.render('activation', {
      message: 'Activation code stub',
      subMessage: 'work in progress',
      // data: response.data,
    })
  } catch (err) {
    // if (axios.isAxiosError(err) && err.response) {
    //   // Is this the correct way?
    //   console.log((err.response?.data as TodoErrorResponse).error);
    // }
    if (axios.isAxiosError(err) && err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (axios.isAxiosError(err) && err.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', err);
    }
  }
})

export default router
