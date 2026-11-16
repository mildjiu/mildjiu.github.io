import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import site from "../../site.json";
import theme, { siteHostname } from "./theme.js";
import knowledgeGraphPlugin from "./knowledge-graph/plugin.js";

const base = (process.env.GITHUB_PAGES_BASE || "/") as `/${string}/` | "/";

export default defineUserConfig({
  base,
  locales: { "/": { lang: "zh-CN" }, "/en/": { lang: "en-US" } },
  title: site.title,
  description: site.description,
  dest: process.env.BLOG_DIST,
  head: [["link", { rel: "icon", href: base + site.avatar.replace(/^\//, "") }]],
  extendsPage(page) {
    if (page.filePathRelative === "README.md") {
      page.frontmatter.heroText = site.title;
      page.frontmatter.tagline = site.tagline;
      page.frontmatter.bgImage = site.hero;
    }
    if (page.filePathRelative === "about.md") {
      page.frontmatter.name = site.name;
      page.frontmatter.avatar = site.avatar;
      page.frontmatter.avatarAlt = site.name;
      page.frontmatter.titles = site.description ? [site.description] : [];
    }
  },
  theme,
  plugins: [knowledgeGraphPlugin({ hostname: siteHostname })],
  bundler: viteBundler(),
});
