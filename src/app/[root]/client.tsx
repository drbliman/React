import React from "react";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../components/header/header"), {
  ssr: false,
});
const Main = dynamic(() => import("../components/main/mainDiv"), { ssr: false });

export function ClientOnly() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}
