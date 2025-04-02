import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { readFileSync } from "fs";
import json from "@rollup/plugin-json";
import inject from "@rollup/plugin-inject";
import postcss from "rollup-plugin-postcss";

const pkg = JSON.parse(readFileSync("./package.json", "utf8"));

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      json(),
      resolve({
        browser: true, 
        preferBuiltins: false, 
      }),
      commonjs(),
      typescript({ 
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "./dist/types" 
      }),
      inject({
        process: "process/browser", 
      }),
      postcss(),
    ],
    external: ["react", "react-dom", "util"],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
