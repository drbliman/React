import React from "react";
import { ClientOnly } from "./client";
import "../index.scss";

export async function generateStaticParams() {
  return [
    { root: "people" },
    { root: "planets" },
    { root: "films" },
    { root: "species" },
    { root: "vehicles" },
    { root: "starships" },
  ];
}

export default function Page() {
  return <ClientOnly />;
}
