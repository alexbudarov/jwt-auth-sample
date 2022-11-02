export const oidcConfig = {
  authority: "http://localhost:8180/realms/mydemo",
  client_id: "tickets",
  realm: "mydemo",
  scope: "openid profile"
};

export const ID_TOKEN_STORAGE_KEY = `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`;
