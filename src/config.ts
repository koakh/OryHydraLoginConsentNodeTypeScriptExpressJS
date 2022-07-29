import { AdminApi, Configuration } from '@oryd/hydra-client';

const baseOptions: any = {};

if (process.env.MOCK_TLS_TERMINATION) {
  baseOptions.headers = { 'X-Forwarded-Proto': 'https' };
}

const hydraAdmin = new AdminApi(
  new Configuration({
    basePath: process.env.HYDRA_ADMIN_URL,
    baseOptions,
  })
);

const identityServerConfig = {
  ccardIdentityServerUri: process.env.CCARD_IDENTITY_SERVER_URI,
  ccardIdentityServerApikey: process.env.CCARD_IDENTITY_SERVER_APIKEY,
};

const i18n = {
  validationMessage: {
    activationCode: 'activation code must be 10 chars long',
    activationOldPasswordCode: 'old password must be 10 chars long',
    password:
      "must have at least 8 character's, one lower, one upper, one number and one symbol",
  },
  messages: {
    activateLoginSuccessTitle: 'Login activated successfully',
    activateLoginSuccessMessage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non lorem vel ante sodales scelerisque. Nullam mattis sapien augue, in scelerisque lectus rhoncus et. Vestibulum felis nulla, tincidunt auctor lacus in, ornare finibus tellus. Curabitur sit amet ipsum cursus, cursus dui at, facilisis turpis. Aliquam aliquam bibendum nibh. Nulla blandit cursus ante. Curabitur semper augue id lorem placerat, quis condimentum augue vestibulum. Vestibulum tellus tortor, convallis at ligula convallis, eleifend pretium ante. Ut condimentum ullamcorper nunc, ut tristique augue tristique mattis. In feugiat neque eget aliquet venenatis. Aliquam pellentesque faucibus dui, faucibus facilisis nisl ultrices auctor. ',
  },
};

export { hydraAdmin, identityServerConfig, i18n };
