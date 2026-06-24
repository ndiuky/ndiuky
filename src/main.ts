import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";

const root = document.getElementById("root");

if (!root) throw new Error("root not found");

const app = createRoot(root);
const mainComponent = React.createElement(
  StrictMode,
  null,
  React.createElement(App),
);

app.render(mainComponent);
