export const oidcConfig = {
  authority: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_onX2JQc96",
  client_id: "kqaab083gaee2ja8r41b3j39g",
  end_session_endpoint: "https://amplicodestateless.auth.eu-central-1.amazoncognito.com/logout?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%3Freturn_path%3D%252F&client_id=kqaab083gaee2ja8r41b3j39g&scope=openid+profile&response_type=code",
  //realm: "stateless",
  scope: "openid profile"
};

export const ID_TOKEN_STORAGE_KEY = `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`;
