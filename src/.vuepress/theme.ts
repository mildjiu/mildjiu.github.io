import { hopeTheme } from "vuepress-theme-hope";
import site from "../../site.json";

export const siteHostname = process.env.BLOG_HOSTNAME || "http://localhost:8080";

const repository = process.env.GITHUB_REPOSITORY as `${string}/${string}` | undefined;
const giscusRepoId = process.env.BLOG_GISCUS_REPO_ID;
const giscusCategoryId = process.env.BLOG_GISCUS_CATEGORY_ID;
const searchVersion = process.env.GITHUB_SHA?.slice(0, 8) ?? "local";

export default hopeTheme({
  hostname: siteHostname,
  author: { name: site.name, url: "/about.html" },
  logo: site.avatar,
  repo: repository,
  repoDisplay: false,
  docsDir: "src",
  editLink: false,
  locales: {
    "/": {
      navbar: [
        { text: "主页", icon: "house", link: "/" },
        {
          text: "文章",
          icon: "book-open",
          children: [
            {
              text: "浏览",
              children: [
                { text: "文章索引", link: "/posts/" },
                { text: "分类", link: "/category/" },
                { text: "标签", link: "/tag/" },
                { text: "时间轴", link: "/timeline/" },
              ],
            },
            {
              text: "文章关联",
              children: [{ text: "本站知识图谱", link: "/knowledge-graph/" }],
            },
          ],
        },
        { text: "外站", icon: "link", link: "/external-links/" },
        { text: "关于", icon: "user", link: "/about.html" },
      ],
      sidebar: { "/posts/": "structure", "/": [] },
    },
    "/en/": {
      navbar: [{ text: "Home", icon: "house", link: "/en/" }],
      sidebar: false,
    },
  },
  displayFooter: true,
  blog: {
    avatar: site.avatar,
    description: site.description,
    intro: "/about.html",
  },
  print: true,
  pageInfo: ["Author", "Date", "Category", "Tag", "Word", "ReadingTime"],
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    preview: true,
    spoiler: true,
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,
    markmap: true,
    math: { type: "katex" },
    mermaid: true,
  },
  plugins: {
    blog: true,
    slimsearch: {
      indexContent: true,
      customFields: [
        { getter: (page) => page.frontmatter.category, formatter: "分类：$content" },
        { getter: (page) => page.frontmatter.tag, formatter: "标签：$content" },
      ],
      worker: `slimsearch.worker.${searchVersion}.js`,
      filter: (page) => page.filePathRelative?.startsWith("posts/") === true && page.frontmatter.article !== false,
    },
    comment: repository && giscusRepoId && giscusCategoryId
      ? {
          provider: "Giscus",
          repo: repository,
          repoId: giscusRepoId,
          category: "Announcements",
          categoryId: giscusCategoryId,
          mapping: "pathname",
          strict: true,
          reactionsEnabled: true,
          inputPosition: "top",
          lazyLoading: true,
          lightTheme: "light",
          darkTheme: "dark",
        }
      : false,
    components: { components: ["Badge", "VPCard"] },
    icon: { assets: "fontawesome-with-brands" },
  },
});
