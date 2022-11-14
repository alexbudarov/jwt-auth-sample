import { action, makeObservable, observable } from "mobx";
import { ApolloClient, gql } from "@apollo/client";
import { AuthContextProps } from "react-oidc-context";
import { ID_TOKEN_STORAGE_KEY } from "./oidcConfig";

export class SecurityStore {
  @observable userName: string | null = null;

  constructor(
    private client: ApolloClient<unknown>,
    private auth: AuthContextProps
  ) {
    makeObservable(this);
  }

  @action
  login = async () => {
    console.log("signinRedirect()")
    await this.auth.signinRedirect();
  };

  @action
  logout = async () => {
    const post_logout_redirect_uri = window.location.href;
    await localStorage.removeItem(ID_TOKEN_STORAGE_KEY);
    await this.auth.signoutRedirect({ post_logout_redirect_uri });
  };

  @action
  checkSession = async (): Promise<void> => {
    console.log("checkSession()")
    return this.client
      .query({
        query: gql`
          query {
            userInfo {
              username
            }
          }
        `
      })
      .then(
        action(resp => {
          console.log("userInfo() response: " + resp.data)
          const {
            userInfo: { username }
          } = resp.data;
          this.userName = username;
        })
      )
      .catch(
        action(async () => {
          console.log("userInfo() exception");
          await this.logout();
        })
      );
  };
}
