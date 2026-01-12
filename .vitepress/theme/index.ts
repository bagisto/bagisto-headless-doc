import Layout from "./Layout.vue";
import "./custom.css";
import { h } from "vue";
import Theme from "vitepress/theme";
import Mermaid from "vitepress-plugin-mermaid/Mermaid.vue";

export default {
  extends: Theme,
  Layout,
  enhanceApp({ app }) {
    app.component("Mermaid", Mermaid);
  },
};
