import globImport from "rollup-plugin-glob-import";
import metablock from "rollup-plugin-userscript-metablock";
import resolveJsonModule from "@rollup/plugin-json";
import styles from "rollup-plugin-styler";
import swc from "@rollup/plugin-swc";
import terser from "@rollup/plugin-terser";

/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    input: "src/index.ts",
    output: {
      file: "public/\u767d\u72d0\u306e\u30d1\u30ef\u30fc.user.js",
    },
    plugins: [
      globImport({ format: "import" }),
      resolveJsonModule(),
      styles({ minimize: true }),
      swc({
        swc: {
          jsc: {
            parser: {
              syntax: "typescript",
              tsx: true,
            },
            target: "esnext",
          },
        },
      }),
      terser(),
      metablock(),
    ],
  },
];
