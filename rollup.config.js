import globImport from "rollup-plugin-glob-import";
import metablock from "rollup-plugin-userscript-metablock";
import resolveJsonModule from "@rollup/plugin-json";
import styles from "rollup-plugin-styler";
import swc from "@rollup/plugin-swc";
import terser from "@rollup/plugin-terser";
import svelte from "rollup-plugin-svelte";
import nodeResolve from "@rollup/plugin-node-resolve";
import html from "@rollup/plugin-html";
import importAsString from "rollup-plugin-string-import";

const swcOpts = {
  swc: {
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
      },
      target: "esnext",
    },
  },
};

/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    input: "injected/index.ts",
    output: {
      file: "public/injected.js", // Currently writing to the public folder incase I decide to @require it.
      format: "iife",
    },
    plugins: [
      globImport({ format: "import" }),
      resolveJsonModule(),
      styles({ minimize: true }),
      swc(swcOpts),
      terser(),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: "public/\u767d\u72d0\u306e\u30d1\u30ef\u30fc.user.js",
      inlineDynamicImports: true,
    },
    plugins: [
      globImport({ format: "import" }),
      resolveJsonModule(),
      styles({ minimize: true }),
      importAsString({
        include: ["**/injected.js"],
      }),
      swc(swcOpts),
      terser(),
      metablock(),
    ],
  },
  {
    input: "ui/index.ts",
    output: { file: "public/index.js" },
    plugins: [
      svelte({
        extensions: [".svelte"],
        include: "ui/**/*.svelte",
      }),
      nodeResolve({
        browser: true,
        exportConditions: ["svelte"],
        extensions: [".svelte"],
      }),
      styles({ minimize: true }),
      swc(swcOpts),
      terser(),
      html({
        title: "WFP UI",
      }),
    ],
    onwarn: (warning, handler) => {
      if (warning.code == "CIRCULAR_DEPENDENCY") return;
      handler(warning);
    },
  },
];
