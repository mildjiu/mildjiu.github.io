# Choso 的博客

## 访客和站主用两个入口

- 访客打开公开的 https://用户名.github.io 就能读文章，无需登录。
- 站主在 [Pages CMS](https://app.pagescms.org/) 用自己的 GitHub 账号登录。只有拿到仓库写入授权的人能保存文章、替换图片和修改博客设置。
- 博客的源文件和历史会随 GitHub 免费版的公开仓库一起公开。请把未公开的草稿留在本机，写好再放进编辑器。

## 第一次上线

1. 登录 GitHub，创建名为 **你的用户名.github.io** 的空白公开仓库。
2. 把本项目的源文件推送到仓库的 main 分支。可以把空仓库链接发给 Codex，由它协助推送。首次推送时，GitHub 可能会请你在浏览器确认登录。
3. 打开仓库的 **Settings → Pages**，把 **Source** 设为 **GitHub Actions**。若首次推送早于这项设置，到 **Actions → Deploy blog to GitHub Pages** 点击 **Run workflow**。通过后，站点会出现在 https://用户名.github.io。
4. 打开 [Pages CMS](https://app.pagescms.org/)，用同一 GitHub 账号登录并安装 Pages CMS。授权时选择 **Only select repositories**，只勾选这个博客仓库，再在 Pages CMS 选择此仓库的 main 分支。

参见 [GitHub Pages 发布说明](https://docs.github.com/zh/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) 和 [Pages CMS 快速上手](https://pagescms.org/docs/quick-start/)。

## 平时发文章、上传图片

1. 登录 Pages CMS，打开「文章」，新增一条文章或点开已有文章。
2. 填标题和日期，按需添加分类、标签、摘要。正文可以直接打字、调整格式，也能在编辑器里插图，或先把文件拖进图片区。
3. 点保存后，GitHub 会自动生成和发布网站，再确认公开首页是否已更新。绿色对勾表示确认成功。可以在 [发布记录](https://github.com/mildjiu/mildjiu.github.io/actions) 查看。

如果希望只在发布出错时收到提醒，先在 GitHub 仓库订阅通知，然后到 [GitHub 通知设置](https://github.com/settings/notifications) 的 System → Actions 选 Email 或 On GitHub，再启用 Only notify for failed workflows。

在「博客设置」可以换站名、昵称、首页短句、简介、头像和封面。删除示例文章可用「文章」列表的删除操作。写公式、图表等 VuePress 扩展语法时，可用编辑器的 Markdown 源码模式。

更换图片时，先上传新图，再到文章或博客设置中选用它。如果在图片库里重命名图片，旧文章中的图片链接需要重新选择，失效的图片会显示提示。

外站资源清单位于 src/.vuepress/components/data/websites.json。导航和主题设置位于 src/.vuepress/theme.ts。

## 本地预览

安装 Node.js 22 和项目指定的 pnpm 后，在本目录运行：

    pnpm install --frozen-lockfile
    pnpm docs:dev

打开终端显示的网址。要生成正式网页，使用 pnpm docs:build。

## 来源

博客基于 [Goat_Yang 的 MyBlog](https://github.com/Yang-goat/MyBlog/tree/44aa1bc93ef2593c604c0c4e9c54c626a9b68c39) 和 [VuePress Theme Hope](https://theme-hope.vuejs.press/zh/)，保留了原项目的 MIT 许可证。博客内容、头像、横幅和资源清单使用本站的示例资料。

Giscus 评论可在站主自己的 GitHub 仓库开启 Discussions 并授权 Giscus 后启用。将 giscus.app 提供的仓库和 Announcements 分类 ID 填到仓库的 Actions 变量 BLOG_GISCUS_REPO_ID 与 BLOG_GISCUS_CATEGORY_ID，再运行发布流程。两个变量齐备时，文章页会显示评论框。
