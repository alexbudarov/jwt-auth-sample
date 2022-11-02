import React, { PropsWithChildren, useEffect, useState } from "react";
import { SecurityContext } from "./SecurityContext";
import { SecurityStore } from "./SecurityStore";
import { useApolloClient } from "@apollo/client";
import { Loading } from "../feedback/Loading";
import axios from "axios";
import { serverErrorEmitter } from "../error/serverErrorEmitter";
import { REQUEST_SAME_ORIGIN } from "../../config";

export function SecurityProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <AxiosProvider>
      <SecurityStoreProvider>{children}</SecurityStoreProvider>
    </AxiosProvider>
  );
}

function SecurityStoreProvider({ children }: PropsWithChildren<unknown>) {
  const client = useApolloClient();

  const [securityStore, setSecurityStore] = useState<
    SecurityStore | undefined
  >();

  useEffect(() => {
    if (securityStore == null) {
      setSecurityStore(new SecurityStore(client));
    }
  }, [client, securityStore]);

  if (securityStore == null) {
    return <Loading />;
  }

  return (
    <SecurityContext.Provider value={securityStore}>
      {children}
    </SecurityContext.Provider>
  );
}

function AxiosProvider({ children }: PropsWithChildren<unknown>) {
  useEffect(() => {
    axios.interceptors.response.use(response => {
      if (response.status === 401) {
        serverErrorEmitter.emit("unauthorized");
      }
      return response;
    });
    axios.defaults.withCredentials = !REQUEST_SAME_ORIGIN;
  }, []);

  return <>{children}</>;
}
