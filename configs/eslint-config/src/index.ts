import tslint, { ConfigArray } from "typescript-eslint"
import { baseConfig } from "./configs/base-config"
import { react } from "./configs/react"

export function defineConfig(): ConfigArray {
  return tslint.config(react(), ...baseConfig)
}
