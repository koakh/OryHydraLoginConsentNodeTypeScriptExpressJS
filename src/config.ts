import { AdminApi, Configuration } from '@oryd/hydra-client'

const baseOptions: any = {}

if (process.env.MOCK_TLS_TERMINATION) {
  baseOptions.headers = { 'X-Forwarded-Proto': 'https' }
}

const hydraAdmin = new AdminApi(
  new Configuration({
    basePath: process.env.HYDRA_ADMIN_URL,
    baseOptions
  })
)

const identityServerConfig = {
  ccardIdentityServerUri: process.env.CCARD_IDENTITY_SERVER_URI,
  ccardIdentityServerApikey: process.env.CCARD_IDENTITY_SERVER_APIKEY,
}

const i18n = {
  validationMessage: {
    activationCode: 'activation code must be 10 chars long',
    activationOldPasswordCode: 'old password must be 10 chars long',
    password: 'must have at least 8 character\'s, one lower, one upper, one number and one symbol',
  }
}

export { hydraAdmin, identityServerConfig, i18n }
