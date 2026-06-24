import type { FC } from "react";
import { Background } from "@/components";
import animeGif from "/anime.gif";
import { HomePage } from "./pages";

export const App: FC = () => {
  return (
    <>
      <Background image={animeGif} />

      <HomePage />
    </>
  );
};
