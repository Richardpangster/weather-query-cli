# 开发任务清单

## Task 1: 项目初始化 ✅
- [x] 初始化 npm 项目 (`npm init -y`)
- [x] 安装 TypeScript (`npm install -D typescript @types/node`)
- [x] 创建 tsconfig.json
- [x] 配置 package.json scripts (build, start, dev)

## Task 2: 核心功能 ✅
- [x] 解析命令行参数（城市名）
- [x] 调用 wttr.in API 获取天气数据
- [x] 格式化输出结果

## Task 3: 优化 ✅
- [x] 添加错误处理（城市不存在、网络错误）
- [x] 添加命令行帮助 (`--help`)
- [x] 添加版本号 (`--version`)

## Task 4: 打包发布 ✅
- [x] 编译 TypeScript
- [x] 测试 CLI 可用性
- [x] 更新 README 使用说明

---

## Feature: 未来3天天气预报 ✅

### Task 5: 添加 forecast 参数 ✅
- [x] 解析 `--forecast` / `-f` 参数
- [x] 解析 `--days <n>` 参数（默认3天）

### Task 6: 修改 API 调用 ✅
- [x] 切换 wttr.in 到 JSON 格式 (`?format=j1`)
- [x] 提取未来3天预报数据

### Task 7: 格式化 forecast 输出 ✅
- [x] 按天分组的输出格式
- [x] 显示日期、天气、温度范围、湿度

### Task 8: 兼容性和测试 ✅
- [x] 不加参数时保持原有行为
- [x] 更新 README 文档
- [x] 更新版本号到 v1.1.0
