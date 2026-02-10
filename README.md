# Loan calculator case

React app build /w

- vite
Builds fast with easy config, creating a great dev experience. Has good plugin and library support (including 'vitest')
The app was initially created using `npm create vite` for fast setup with minimal config.

- [tailwindcss](https://tailwindcss.com/):
Gives access to more or less everything css, without the need for css files. Speeds up styling and easy to setup with vite.

- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query):
Simplifies fetching and state management. Removes the need to write complicated custom fetching hooks with error handling and state management.

- [react-hook-form](https://www.npmjs.com/package/react-hook-form):
Removes the need to manage form state and makes form validation easy.

- [vitest](https://www.npmjs.com/package/vitest) (+ @testing-library):
Implements well with vite, making it easy to write tests for react components using '@testing-library/react'

## Run locally
1. Install dependencies
```
npm install
```

2. Build app
```
npm run build
```
It's important to run this (at least once) before starting the local dev server. This script generates api types (using ```openapi-typescript```) and icon components.

3. Run dev server
```
npm run dev
```

4. Open http://localhost:5173 in your browser

## Project structure

```md
src/
- components/ # React components. Includes ```LoanCalculator.tsx`` which acts as a master component for the loan calculator form
- hooks/ # React hooks. Includes ```useApiQuery.ts``` (used for react-query GET requests) and ```useCalculateLoan.tsx``` (handles calculate loan POST request)
- utils/ # Helper functions
- config/env # Handles env variables
- tests/components # Tests for react components
- types/ # Reusable type declarations, contains the generated openapi types from the API (```https://loancalculator-ivory.vercel.app/api/openapi.yaml```).
- assets/icons # All icons used as svg files.
```



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
