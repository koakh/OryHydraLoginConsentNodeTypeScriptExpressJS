import express from 'express'
import url from 'url'
import csrf from 'csurf'

// Sets up csrf protection
const csrfProtection = csrf({ cookie: true })
const router = express.Router()

router.get('/', csrfProtection, (req, res, next) => {

  // If authentication can't be skipped we MUST show the login UI.
  res.render('forget', {
    message: 'Forget stub',
    subMessage: 'work in progress'
  })
})

export default router
