import { statSync } from "node:fs";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vuepress/core";
import { logger } from "vuepress/utils";

const mediaPrefix = "/images/posts/";
const mediaDirectory = fileURLToPath(new URL("./public/images/posts/", import.meta.url));

export function availableBlogImage(source: string): string | undefined {
  if (!source) return;
  if (!source.startsWith(mediaPrefix)) return source;

  let name: string;
  try {
    name = decodeURIComponent(source.slice(mediaPrefix.length).split(/[?#]/, 1)[0]);
  } catch {
    return;
  }

  const file = resolve(mediaDirectory, name);
  const offset = relative(mediaDirectory, file);
  if (!offset || isAbsolute(offset) || offset === ".." || offset.startsWith(".." + sep)) return;
  if (statSync(file, { throwIfNoEntry: false })?.isFile()) return source;
}

export const blogMediaPlugin: Plugin = {
  name: "blog-media",
  extendsMarkdown(markdown) {
    const renderImage = markdown.renderer.rules.image;
    markdown.renderer.rules.image = (tokens, index, options, env, renderer) => {
      const image = tokens[index];
      const source = image.attrGet("src");
      if (source?.startsWith(mediaPrefix) && !availableBlogImage(source)) {
        const alt = renderer.renderInlineAsText(image.children ?? [], options, env);
        logger.warn("[blog-media] Missing article image: " + source);
        const fallback = alt ? "图片暂不可用：" + alt : "图片暂不可用";
        return '<span class="blog-missing-image">' + markdown.utils.escapeHtml(fallback) + "</span>";
      }
      return renderImage
        ? renderImage(tokens, index, options, env, renderer)
        : renderer.renderToken(tokens, index, options);
    };
  },
};
