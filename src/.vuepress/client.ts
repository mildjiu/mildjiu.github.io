import { defineSearchConfig } from "@vuepress/plugin-slimsearch/client";
import { markRaw } from "vue";
import { defineClientConfig } from "vuepress/client";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
import Blog from "./layouts/Main.vue";
import TreasureSites from "./layouts/TreasureSites.vue";

// The search options are sent to a Worker and need to remain serializable.
defineSearchConfig(markRaw({
  boost: { h: 10, t: 1, c: 0.5 },
  prefix: true,
  fuzzy: 0.15,
  maxFuzzy: 1,
  combineWith: "AND",
}));

export default defineClientConfig({
  layouts: { Blog, TreasureSites },
  setup() {
    setupTransparentNavbar({ type: "homepage", threshold: 80, light: "#fff", dark: "#fff" });
  },
});
