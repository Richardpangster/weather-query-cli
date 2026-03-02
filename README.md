# Weather Query CLI

一个命令行天气查询工具。

## 功能

输入城市名，查询当天天气情况。

## 安装

```bash
git clone https://github.com/Richardpangster/weather-query-cli.git
cd weather-query-cli
npm install
npm run build
```

## 使用方式

```bash
# 查询天气
node dist/index.js 北京
# 输出：
# 城市: 北京
# 天气: 晴
# 温度: 25°C
# 湿度: 45%

# 查看帮助
node dist/index.js --help

# 查看版本
node dist/index.js --version
```

## 技术栈

- Node.js
- TypeScript
- wttr.in 免费天气 API

## 项目结构

```
weather-query-cli/
├── src/
│   └── index.ts          # 主程序
├── dist/                 # 编译输出
├── docs/
│   └── tasks.md          # 开发任务清单
├── package.json
├── tsconfig.json
└── README.md
```

## 开发

```bash
# 开发模式
npm run dev

# 编译
npm run build

# 运行
npm start
```
