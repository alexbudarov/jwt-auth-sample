import { useEffect } from "react";

const defaultPageTitle = "JWT Demo";

export function usePageTitle(pageTitle: string) {
  useEffect(() => {
    document.title = pageTitle;
    return () => {
      document.title = defaultPageTitle;
    };
  }, [pageTitle]);
}
