import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    message:
      'You have reached the User Login & Consent Flow reference implementation!',
    subMessage:
      'This application will give you an idea of how you could implement the login and consent endpoints yourself. Keep in mind, that this application does not actually solve user login, it has only one user for testing.',
  });
});

export default router;
