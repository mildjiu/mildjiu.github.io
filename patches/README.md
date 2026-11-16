# SlimSearch 补丁说明

当前固定版本：`@vuepress/plugin-slimsearch@2.0.0-rc.130`。

- `src/.vuepress/client.ts` 用 `markRaw` 保留静态搜索配置。插件内部的 Vue `ref` / `readonly` 会把嵌套 `boost` 转为 Proxy；通过 Worker `postMessage` 发送时会报 `DataCloneError`。
- pnpm 补丁在开发与生产 Worker 加载索引时补上 `Intl.Segmenter("zh-CN", { granularity: "word" })`，与当前站点唯一纳入搜索的 `zh-CN` 页面建索引规则一致。否则“小波分析”“元数据”等查询不会按索引词语拆分。
- 配置和补丁均不改变页面过滤、路由、权重或依赖版本。不要将分词函数放进客户端搜索选项：函数也不能通过 `postMessage` 传输。
- 将来索引其他语言时，需要把 Worker 分词语言与各索引语言一起调整。升级插件时先核对上游是否修复，再重新评估或移除补丁。

验证：

```powershell
pnpm.cmd install --frozen-lockfile
pnpm.cmd docs:build
```

构建后打开首页，搜索示例文章正文里的「平均值」，核对结果和文章跳转。
`theme.ts` 还显式指定分类和标签的字符串 formatter，避免主题默认生成的 locale 对象在渲染时触发 `.split is not a function`。
