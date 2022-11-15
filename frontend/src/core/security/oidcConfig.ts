export const oidcConfig = {
  authority: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_O3uR6lpSy",
  client_id: "4k622pmlqkd540vod9dljlhs7f",
  end_session_endpoint: "https://spring-buddy-cogn-test.auth.eu-central-1.amazoncognito.com/logout?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%3Freturn_path%3D%252F&client_id=4k622pmlqkd540vod9dljlhs7f&scope=openid+profile&response_type=code",
  scope: "openid profile"
};

export const ID_TOKEN_STORAGE_KEY = `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`;
