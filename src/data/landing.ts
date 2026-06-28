export type Contact = {
  label: string;
  value: string;
  href: string;
};

export type FloatingToken = {
  text: string;
  x: string;
  delay: string;
  duration: string;
  size: string;
  rotate: string;
};

export type Profile = {
  handle: string;
  name: string;
  avatar: string;
  location: string;
  bio: string;
  status: string;
  githubUrl: string;
};

export type Stat = {
  value: string;
  label: string;
};

export const profile: Profile = {
  handle: "ndiuky",
  name: "Merlin Sparrow / Farid Tipayev",
  avatar: "https://avatars.githubusercontent.com/u/136149081?v=4",
  location: "Baku, Azerbaijan",
  bio: "Web enthusiast building a tiny neon corner of the internet, soft pixels, and a lot of kawaii noise.",
  status: "hireable",
  githubUrl: "https://github.com/ndiuky",
};

export const stats: Stat[] = [
  { value: "44", label: "followers" },
  { value: "54", label: "following" },
  { value: "1", label: "public repo" },
];

export const contacts: Contact[] = [
  {
    label: "GitHub",
    value: "github.com/ndiuky",
    href: "https://github.com/ndiuky",
  },
  { label: "Telegram", value: "@ndiuky_dev", href: "https://t.me/ndiuky_dev" },
  { label: "Discord", value: "@ndiuky_dev", href: "https://discord.com/" },
  {
    label: "Email",
    value: "anod100002@gmail.com",
    href: "mailto:anod100002@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ndiuky",
    href: "https://linkedin.com/in/ndiuky",
  },
];

export const stack = [
  "TypeScript",
  "Vue",
  "Docker",
  "Postgres",
  "Redis",
  "Mobx",
  "Pinia",
  "ThreeJS",
  "gRPC",
  "Bun",
];
export const langs = ["En", "Ru", "Az"];
export const birthDate = "2007-02-20T00:00:00+04:00";

export const floatingTokens: FloatingToken[] = [
  {
    text: "uwu",
    x: "8%",
    delay: "0s",
    duration: "14s",
    size: "1rem",
    rotate: "-12deg",
  },
  {
    text: "nyan",
    x: "18%",
    delay: "-8s",
    duration: "18s",
    size: "0.8rem",
    rotate: "9deg",
  },
  {
    text: "myau",
    x: "31%",
    delay: "-3s",
    duration: "16s",
    size: "1.25rem",
    rotate: "16deg",
  },
  {
    text: "dev",
    x: "46%",
    delay: "-10s",
    duration: "20s",
    size: "0.9rem",
    rotate: "-18deg",
  },
  {
    text: "moe",
    x: "62%",
    delay: "-5s",
    duration: "15s",
    size: "1rem",
    rotate: "7deg",
  },
  {
    text: "baka",
    x: "76%",
    delay: "-12s",
    duration: "19s",
    size: "0.85rem",
    rotate: "-8deg",
  },
  {
    text: "nya",
    x: "90%",
    delay: "-2s",
    duration: "17s",
    size: "1.15rem",
    rotate: "13deg",
  },
];
