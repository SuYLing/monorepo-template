# 搭建一个monorepo项目
```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "configs/*"

catalog:
  unbuild: ^3.2.0
  typescript: ^5.7.2
  eslint: ^9.17.0
  prettier: ^3.4.2
  typescript-eslint: ^8.18.2
  eslint-plugin-react-hooks: ^5.0.0
  eslint-plugin-react-refresh: ^0.4.16
  globals: ^15.14.0
  tsup: ^8.3.5
  "@eslint/js": ^9.17.0

```
## 统一配置 `eslint`
```text
configs:
  -- eslint-config
    -- package.json
```
#### react为例子
1. 安装依赖
```json
 "devDependencies": {
    "@eslint/js": "catalog:",
    "eslint": "catalog:",
    "eslint-plugin-react-hooks": "catalog:",
    "eslint-plugin-react-refresh": "catalog:",
    "globals": "catalog:",
    "tsup": "catalog:",
    "typescript": "catalog:",
    "typescript-eslint": "catalog:"
  }
```
2. 配置`tsup`
```ts
// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // 入口
  splitting: false,
  clean: true,// 是否清楚dist
  format: ["cjs", "esm"], // 打包文件支持的模块方式
  dts: true, //是否生成type文件
  external: ["typescript-eslint"],
});

```
3. 声明规范
```txt
src
  - configs
    - base-config.ts # 基础配置文件
    - react.ts # react相关
  - index.ts # 最后的综合配置
```
```ts
// base-config.ts
import js from "@eslint/js"
import globals from "globals"
import tseslint, { InfiniteDepthConfigWithExtends } from "typescript-eslint"

export const baseConfig: InfiniteDepthConfigWithExtends[] = [
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
    },
  },
]
```
```ts
// react.ts
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { InfiniteDepthConfigWithExtends } from "typescript-eslint";
export function react(): InfiniteDepthConfigWithExtends[] {
  return [
    {
      plugins: {
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
      },
    },
  ];
}
```
```ts
// index.ts
import tslint, { ConfigArray } from "typescript-eslint"
import { baseConfig } from "./configs/base-config"
import { react } from "./configs/react"

export function defineConfig(): ConfigArray {
  return tslint.config(react(), ...baseConfig)
}
```