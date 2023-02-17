// This file contains logic which is used when running this application as part of the
// OpenID Connect Conformance test suite. You can use it for inspiration, but please
// do not use it in production as is.

import {
  ConsentRequest,
  ConsentRequestSession,
  LoginRequest,
} from "@oryd/hydra-client"
import { CitizenDto } from "../../types"
import { apiGetCitizenByTaxNo } from "../api"

export const oidcConformityMaybeFakeAcr = (
  request: LoginRequest,
  fallback: string,
) => {
  if (process.env.CONFORMITY_FAKE_CLAIMS !== "1") {
    return fallback
  }

  return request.oidc_context?.acr_values &&
    request.oidc_context.acr_values.length > 0
    ? request.oidc_context.acr_values[
    request.oidc_context.acr_values.length - 1
    ]
    : fallback
}

export const oidcConformityMaybeFakeSession = async (
  grantScope: string[],
  request: ConsentRequest,
  session: ConsentRequestSession,
): Promise<ConsentRequestSession> => {
  if (process.env.CONFORMITY_FAKE_CLAIMS !== "1") {
    return session
  }

  const idToken: { [key: string]: any } = {}

  // TODO: use ROLES from identity user, must add ROLES array to identity

  // TODO: handle error with .catch
  const data: CitizenDto = await apiGetCitizenByTaxNo(request.subject as string);
  // console.log(JSON.stringify(data, null, 2));
  // console.log(JSON.stringify(request, null, 2));

  // console.log(`idToken: [${idToken}]`);
  // console.log(`grantScope: [${JSON.stringify(grantScope, undefined, 2)}]`);
  // console.log(`request: [${JSON.stringify(request, undefined, 2)}]`);
  // console.log(`session: [${JSON.stringify(session, undefined, 2)}]`);

  idToken.scope = {
    profile: {},
    email: {},
    phone: {},
    address: {},
  }

  // If the email scope was granted, fake the email claims.
  if (grantScope.indexOf("email") > -1) {
    // But only do so if the email was requested!
    // idToken.email = "foo@bar.com";
    // idToken.email_verified = true;

    // kuartzo data
    idToken.scope.email.email = data.email ? data.email : undefined;
    idToken.scope.email.emailVerified = data.emailVerified ? data.emailVerified : undefined;
  }

  // If the phone scope was granted, fake the phone claims.
  if (grantScope.indexOf("phone") > -1) {
    // idToken.phone_number = "1337133713371337";
    // idToken.phone_number_verified = true;

    // kuartzo data
    idToken.scope.phone.phoneNumber = data.phoneNumber
      ? data.phoneNumber
      : undefined;
    idToken.scope.phone.phoneNumberVerified = idToken.phoneNumberVerified === true || idToken.phoneNumberVerified === false
      ? data.phoneNumberVerified
      : false;
  }

  // If the profile scope was granted, fake the profile claims.
  if (grantScope.indexOf("profile") > -1) {
    // idToken.name = "Foo Bar"
    // idToken.givenName = data.givenName
    // idToken.family_name = "Bar"
    // idToken.website = "https://www.ory.sh"
    // idToken.zoneinfo = "Europe/Berlin"
    // idToken.birthdate = "1.1.2014"
    // idToken.gender = "robot"
    // idToken.profile = "https://www.ory.sh"
    // idToken.preferred_username = "robot"
    // idToken.middle_name = "Baz"
    // idToken.locale = "en-US"
    // idToken.picture =
    //   "https://raw.githubusercontent.com/ory/web/master/static/images/favico.png"
    // idToken.updated_at = 1604416603
    // idToken.nickname = "foobot"

    // kuartzo data
    // idToken.id = data.id;
    idToken.scope.profile.givenName = data.givenName;
    idToken.scope.profile.documentType = data.documentType;
    // idToken.documentVersion = data.documentVersion;
    idToken.scope.profile.documentNumber = data.documentNumber;
    idToken.scope.profile.localOfRequest = data.localOfRequest;
    idToken.scope.profile.issuingEntity = data.issuingEntity;
    idToken.scope.profile.validityBeginDate = data.validityBeginDate;
    idToken.scope.profile.validityEndDate = data.validityEndDate;
    // idToken.documentPan = data.documentPan;
    idToken.scope.profile.civilianIdNumber = data.civilianIdNumber;
    idToken.scope.profile.taxNo = data.taxNo;
    idToken.scope.profile.socialSecurityNumber = data.socialSecurityNumber;
    idToken.scope.profile.healthNumber = data.healthNumber;
    idToken.scope.profile.parents = data.parents;
    idToken.scope.profile.givenNameFather = data.givenNameFather;
    idToken.scope.profile.givenNameMother = data.givenNameMother;
    // idToken.accidentalIndications = data.accidentalIndications;
    idToken.scope.profile.nationality = data.nationality;
    idToken.scope.profile.country = data.country;
    idToken.scope.profile.dateOfBirth = data.dateOfBirth;
    idToken.scope.profile.height = data.height;
    idToken.scope.profile.gender = data.gender;
    // roles
    // neo4j graphql library only work with root fields
    idToken.scope.profile.roles = data.roles;
    // Use the roles property to specify the allowed roles for an operation. Use the Neo4jGraphQL config option rolesPath to specify a object path for JWT roles otherwise defaults to jwt.roles.
    // idToken.roles = data.roles;
  }

  // TODO: currently not in use
  // If the address scope was granted, fake the address claims.
  if (grantScope.indexOf("address") > -1) {
    idToken.scope.address = {
      country: "Localhost",
      region: "Intranet",
      street_address: "Local Street 1337",
    }
  }

  return {
    access_token: session.access_token,
    id_token: {
      ...idToken,
      // if uncommen this wil override idToken
      // ...session.id_token,
    },
  }
}
