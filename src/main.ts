import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

const root = document.getElementById("root");

if (!root) throw new Error("root not found");

createApp(App).mount(root);
