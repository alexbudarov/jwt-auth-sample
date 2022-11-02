import { PropsWithChildren, useEffect } from "react";
import React from "react";
import { useSecurity } from "./useSecurity";
import { observer } from "mobx-react";
import { Login } from "./login/Login";

export const Auth = observer(({ children }: PropsWithChildren<unknown>) => {
  const { initialize, isLoggedIn } = useSecurity();

  useEffect(() => {
    if (isLoggedIn) {
      void initialize();
    }
  }, [initialize, isLoggedIn]);

  if (!isLoggedIn) {
    return <Login />;
  }

  return <>{children}</>;
});
