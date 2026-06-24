import type { FC } from "react";

interface BackgroundProps {
  image: string;
}

export const Background: FC<BackgroundProps> = ({ image }) => {
  return (
    <>
      <img
        src={image}
        className="fixed inset-0 h-full w-full object-cover -z-10"
      />
    </>
  );
};
