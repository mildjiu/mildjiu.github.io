import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, renameSync, rmSync, rmdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { createMarkdown } from "vuepress/markdown";
import { availableBlogImage, blogMediaPlugin } from "../src/.vuepress/blog-media.ts";

test("renaming an uploaded image leaves existing articles renderable", () => {
  const gallery = fileURLToPath(new URL("../src/.vuepress/public/images/posts/", import.meta.url));
  mkdirSync(gallery, { recursive: true });
  const folder = mkdtempSync(join(gallery, "test-upload-"));
  const oldFile = join(folder, "original.webp");
  const newFile = join(folder, "renamed.webp");
  const url = "/images/posts/" + basename(folder) + "/";
  const originalUrl = url + "original.webp";
  const renamedUrl = url + "renamed.webp";

  try {
    writeFileSync(oldFile, "");
    const markdown = createMarkdown();
    blogMediaPlugin.extendsMarkdown(markdown);
    const post = "![封面](" + originalUrl + ")";

    assert.equal(availableBlogImage(originalUrl), originalUrl);
    assert.ok(markdown.render(post).includes('src="' + originalUrl + '"'));

    renameSync(oldFile, newFile);

    assert.equal(availableBlogImage(originalUrl), undefined);
    assert.equal(availableBlogImage(renamedUrl), renamedUrl);
    const rendered = markdown.render(post + "\n\n![新封面](" + renamedUrl + ")");
    assert.match(rendered, /图片暂不可用：封面/);
    assert.ok(!rendered.includes(originalUrl), "removed images must not be imported by the page");
    assert.ok(rendered.includes('src="' + renamedUrl + '"'));
  } finally {
    rmSync(oldFile, { force: true });
    rmSync(newFile, { force: true });
    rmdirSync(folder);
  }
});
