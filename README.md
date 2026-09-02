# SGMS 前端（sgms-ui）

SGMS（安保管理系统）前端项目。

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器（localhost:80，代理 /dev-api -> http://localhost:8080）
npm run dev

# 生产构建
npm run build:prod
```

## 环境变量

- `VUE_APP_BASE_API`：API 前缀（`.env.development` 为 `/dev-api`，`.env.production` 为 `/prod-api`）
- `VUE_APP_TITLE`：网页标题（默认"安保管理系统"）

## 代理配置

见 `vue.config.js` `devServer.proxy`：`/dev-api` → `http://localhost:8080`，`changeOrigin: true`，去除前缀。
