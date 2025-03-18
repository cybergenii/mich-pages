import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "fs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

// Import package.json as an ES module
const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8")
);

// Main bundle configuration
export default [
  // JavaScript bundle
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main || "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module || "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      // Automatically externalize peerDependencies
      peerDepsExternal(),

      // Resolve node_modules
      resolve(),

      // Convert CommonJS modules to ES6
      commonjs(),

      // Process CSS with PostCSS
      postcss({
        extract: true, // Extract CSS to a separate file
        minimize: true, // Minify the CSS


        extensions: [".css"], // Process .css files
      }),

      // Process TypeScript - using tsconfig.app.json
      typescript({
        tsconfig: "./tsconfig.app.json", // Use tsconfig.app.json
        exclude: ["**/__tests__/**", "**/*.test.{ts,tsx}"],
      }),

      // Minify JS output
      terser(),
    ],
    external: ["react", "react-dom", "react/jsx-runtime"],
  },

  // TypeScript declaration files - as a separate build step
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.app.json", // Use tsconfig.app.json
        declaration: true,
        emitDeclarationOnly: true,
        compilerOptions: {
          noEmit: false,
          jsx: "react-jsx", // Add JSX support for declaration files
        },
      }),
 
    ],
    external: [/\.css$/],
  },
];
