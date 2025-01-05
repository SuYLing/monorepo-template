import { getPackagesSync } from "@manypkg/get-packages"
import path from "path"
import type { Config } from "tailwindcss"

export const content: Config["content"] = []
const { packages } = getPackagesSync(process.cwd())
console.log(packages)

const tailwindPackages: string[] = []

packages.forEach((pkg) => {
  tailwindPackages.push(pkg.dir)
})
const tailwindConfig: Config = {
  content: [
    "./index.html",
    ...tailwindPackages.map((item) =>
      path.join(item, "src/**/*.{vue,js,ts,jsx,tsx,svelte,astro,html}"),
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default tailwindConfig
