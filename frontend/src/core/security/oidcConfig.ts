export const oidcConfig = {
  authority: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_O3uR6lpSy",
  client_id: "4k622pmlqkd540vod9dljlhs7f",
  scope: "openid profile"
};

export const ID_TOKEN_STORAGE_KEY = `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`;
