# Weather Query CLI

一个命令行天气查询工具。

## 功能

- 查询城市当天天气
- 查询城市未来3天天气预报

## 安装

```bash
git clone https://github.com/Richardpangster/weather-query-cli.git
cd weather-query-cli
npm install
npm run build
```

## 使用方式

### 查询当天天气
```bash
node dist/index.js 北京
# 输出：
# 城市: 北京
# 天气: 晴
# 温度: 10°C
# 湿度: 45%
```

### 查询未来天气预报
```bash
# 默认3天
node dist/index.js 北京 --forecast
# 或简写
node dist/index.js 北京 -f

# 自定义天数（1-5天）
node dist/index.js 北京 --forecast --days 5
```

输出示例：
```
城市: 北京

今天 (03-02)
  天气: 晴
  温度: 5°C ~ 15°C
  湿度: 45%

明天 (03-03)
  天气: 多云
  温度: 8°C ~ 18°C
  湿度: 50%

后天 (03-04)
  天气: 小雨
  温度: 6°C ~ 12°C
  湿度: 80%
```

### 其他命令
```bash
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

## 版本历史

- **v1.1.0** - 添加未来天气预报功能
- **v1.0.0** - 初始版本，支持当天天气查询
