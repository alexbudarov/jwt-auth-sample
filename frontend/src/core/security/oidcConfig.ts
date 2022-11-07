export const oidcConfig = {
  authority: "http://localhost:8180/realms/stateless",
  client_id: "tickets",
  realm: "stateless",
  scope: "openid profile"
};

export const ID_TOKEN_STORAGE_KEY = `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`;
