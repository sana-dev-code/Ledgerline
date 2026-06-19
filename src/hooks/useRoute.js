import { useEffect, useState } from "react";

function currentRoute() {
  return location.hash.replace("#/", "") || "dashboard";
}

export function useRoute() {
  const [route, setRoute] = useState(currentRoute());

  useEffect(() => {
    function onChange() {
      setRoute(currentRoute());
    }

    window.addEventListener("hashchange", onChange);

    return () => {
      window.removeEventListener("hashchange", onChange);
    };
  }, []);

  function go(nextRoute) {
    location.hash = `/${nextRoute}`;
    setRoute(nextRoute);
  }

  return { route, go };
}