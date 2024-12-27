import { defineConfig } from 'eslint'
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vuePlugin from 'eslint-plugin-vue'

export default defineConfig([
  {
    // Common settings for all files
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest', // Support the latest JavaScript
      sourceType: 'module', // Allow ES Modules
      parserOptions: {
        ecmaFeatures: {
          jsx: true // JSX if needed (e.g., Vue's JSX support)
        }
      }
    },
    rules: {
      semi: ['error', 'never'], // Disable semicolons
      quotes: ['error', 'single'], // Enforce single quotes
      indent: ['error', 2], // Use 2-space indentation
      'no-unused-vars': 'warn' // Warn on unused variables
    }
  },
  {
    // TypeScript-specific settings
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'] // TypeScript unused vars
    }
  },
  {
    // Vue-specific settings
    files: ['**/*.vue'],
    plugins: {
      vue: vuePlugin
    },
    languageOptions: {
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: tsParser, // Use TypeScript parser for Vue scripts
        sourceType: 'module'
      }
    },
    rules: {
      'vue/html-indent': ['error', 2], // Enforce 2-space indent in Vue templates
      'vue/multi-word-component-names': 'off', // Allow single-word component names
      'vue/singleline-html-element-content-newline': 'off' // No newline for single-line elements
    }
  },
  {
    // Node.js-specific settings (for Strapi)
    files: ['apps/strapi/**/*.js', 'apps/strapi/**/*.ts'],
    env: {
      node: true // Enable Node.js globals
    },
    rules: {
      'no-console': 'off', // Allow console logs in backend
      'node/no-unsupported-features/es-syntax': 'off' // Strapi uses ES Modules
    }
  }
])
