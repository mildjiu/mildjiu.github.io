/** The graph describes public articles in the posts collection. */
export const GRAPH_GROUPS = [
  { id: "posts", label: "文章", color: "#5b8ff9" },
];

export const EXCLUDED_TOPIC_TAGS = new Set([
  "教程", "随笔", "理论", "导论", "总结", "综述", "入门", "进阶",
  "模板", "分类", "领域梳理", "指令速查", "算法",
]);

export const GRAPH_PAGE = "knowledge-graph/README.md";
export const MARKDOWN_GRAPH_KEY = "siteKnowledgeGraph";
