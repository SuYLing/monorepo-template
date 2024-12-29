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
