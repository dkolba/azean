import js from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
import functional from "eslint-plugin-functional";
import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import globals from "globals";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tsdoc from "eslint-plugin-tsdoc";
import jsdoc from "eslint-plugin-jsdoc";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  globalIgnores([
    "coverage",
    "dist",
    "eslint.config.js",
    "scripts/ok.js",
    "vite.config.ts",
    "vitest.config.ts",
    "src/vite-env.d.ts",
  ]),
  {
    // enable types for type-aware linting
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        projectService: true,
      },
    },
  },
  // Plugin configs here
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  functional.configs.all,
  eslintPluginUnicorn.configs.all,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      tsdoc,
      jsdoc,
    },
  },
  {
    settings: {
      jsdoc: {
        mode: "typescript",
      },
    },
  },
  // Rules here

  /**
   * ESLint rules
   */
  {
    rules: {
      ...eslint.configs.all.rules,
      "capitalized-comments": [
        "error",
        "always",
        { ignorePattern: "(?:c8|v8|node:coverage) ignore" },
      ],
      "dot-notation": "off",
      "func-names": ["error", "always", { generators: "never" }],
      "max-lines": ["error", { skipBlankLines: true }],
      "no-console": ["error", { allow: ["info", "warn", "error"] }],
      "no-inline-comments": "off",
      "no-ternary": "off",
      "no-undefined": "off",
      "no-underscore-dangle": [
        "error",
        { allow: ["__dirname", "_exhaustive"] },
      ],
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "one-var": "off",
      "sort-imports": "off", // Will be sorted via simple-import-sort
    },
  },

  /**
   * Typescript rules
   */
  {
    rules: {
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-check": true,
          "ts-expect-error": false,
          "ts-ignore": true,
          "ts-nocheck": true,
        },
      ],
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/dot-notation": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowConciseArrowFunctionExpressionsStartingWithVoid: false,
          allowExpressions: false,
          allowFunctionsWithoutTypeParameters: false,
          allowHigherOrderFunctions: true,
          allowIIFEs: false,
          allowTypedFunctionExpressions: true,
        },
      ],
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
    },
  },

  /**
   * Unicorn rules
   */
  {
    rules: {
      ...eslintPluginUnicorn.configs.all.rules,
      "unicorn/better-regex": "warn",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-null": "off",
      "unicorn/number-literal-case": [
        "error",
        {
          hexadecimalValue: "lowercase",
        },
      ],
      "unicorn/no-asterisk-prefix-in-documentation-comments": "off",
    },
  },

  /**
   * Functional rules
   */
  {
    rules: {
      "functional/prefer-immutable-types": [
        "error",
        {
          enforcement: "Immutable",
        },
      ],
      "functional/prefer-tacit": "off",
    },
  },

  /**
   * TsDoc rules
   */
  {
    rules: {
      "tsdoc/syntax": "error",
    },
  },
  /**
   * JsDoc rules
   */
  {
    rules: {
      //
      // Require documentation
      //
      "jsdoc/require-jsdoc": [
        "error",
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: true,
            ClassDeclaration: true,
            MethodDefinition: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
          },
        },
      ],

      //
      // Require descriptions
      //
      "jsdoc/require-description": "warn",
      "jsdoc/require-param-description": "warn",
      "jsdoc/require-returns-description": "warn",

      //
      // Require tags...
      //
      "jsdoc/require-param": "warn",
      "jsdoc/require-returns": "warn",

      //
      // ...but NOT types.
      //
      "jsdoc/no-types": "error",

      //
      // TypeScript already knows nullability/types.
      //
      "jsdoc/check-types": "off",

      //
      // Keep names in sync with the TS signature.
      //
      "jsdoc/check-param-names": "error",
      "jsdoc/check-tag-names": "error",

      //
      // Nice formatting.
      //
      "jsdoc/tag-lines": [
        "warn",
        "never",
        {
          startLines: 1,
        },
      ],
    },
  },

  /**
   * Import sort rules
   */
  {
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  // Exclusions/exemptions here
  /**
   * Effects
   */
  {
    files: ["src/effects/**/*.ts"],
    ...functional.configs.off,
  },
  /**
   * Tests
   */
  {
    files: ["**/*.test.ts", "**/*.spec.ts"],
    ...functional.configs.off,
  },
]);
