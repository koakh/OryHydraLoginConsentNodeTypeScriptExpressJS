import express from 'express'
import url from 'url'
import csrf from 'csurf'
import axios from 'axios'

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
  //   submessage: 'work in progress'
  // })

  try {
    const response = await axios.get<TodoSuccessResponse>(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log(response.data.id);

    res.render('activation', {
      message: 'Activation code stub',
      submessage: 'work in progress',
      data: response.data,
    })
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      // Is this the correct way?
      console.log((err.response?.data as TodoErrorResponse).error);
    }
  }
})

export default router
