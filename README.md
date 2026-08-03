# React 19 Playground

A small playground for learning React 19's new features — the `use()` hook, form
actions, and the hooks that build on them (`useFormStatus`, `useFormState`,
`useOptimistic`, `useTransition`). Each feature lives on its own route, listed
from the home page, so examples stay isolated and readable.

This is for learning purposes only — there is no backend. "Server" work is
simulated with `setTimeout` or public read-only APIs.

## Getting started

```bash
npm install
npm run dev      # Vite dev server with HMR (does NOT type check)
npm run build    # tsc -b (both projects) then vite build
npm run lint     # eslint .
npm run preview  # serve the production build from dist/
```

There is no test framework configured. Because `npm run dev` strips types
without checking them, run `npm run build` (or `npx tsc -b`) to surface type
errors.

## Stack

Vite 8 · React 19.2 · React Router 8 · TypeScript 6 · Tailwind CSS v4

## Examples

| Route | What it demonstrates | Source |
| --- | --- | --- |
| `/use-example-1` | `use()` unwrapping a fetch promise (Chuck Norris API) inside `<Suspense>` | [Joke.tsx](src/components/useExample1/Joke.tsx) |
| `/use-example-2` | Same pattern over a list — posts from JSONPlaceholder | [Posts.tsx](src/components/useExample2/Posts.tsx) |
| `/use-example-3` | A promise created in an event handler, held in state, and passed down to `use()` | [Message.tsx](src/components/useExample3/Message.tsx) |
| `/use-example-4` | `use()` reading a **context** instead of a promise — a light/dark themed card | [Theme.tsx](src/components/useExample4/Theme.tsx) |
| `/action-example-1` | `<form action={fn}>` receiving `FormData` — add posts to a list | [Posts.tsx](src/components/actionExample1/Posts.tsx) |
| `/action-example-2` | An **async** action with a simulated 1s round trip — add books to a cart | [ShoppingCart.tsx](src/components/actionExample2/ShoppingCart.tsx) |
| `/useformstatus-example` | `useFormStatus()` in a child submit button, disabling it while `pending` | [Posts.tsx](src/components/useFormStatusExample/Posts.tsx) |
| `/useformstate-example` | `useFormState()` returning a per-item message ("Added to cart" vs. sold out) | [AddToCartForm.tsx](src/components/useFormStateExample/AddToCartForm.tsx) |
| `/useoptimistic-example` | `useOptimistic()` showing a message with "(Sending...)" before the 2s send resolves | [Message.tsx](src/components/useOptimisticExample/Message.tsx) |
| `/usetransition-example` | `useTransition()` keeping tabs responsive while a deliberately slow tab renders | [Tabs.tsx](src/components/useTransitionExample/Tabs.tsx) |

### Notes on individual examples

- **The `use()` examples memoize their promise.** `use()` must receive the *same*
  promise across renders, so examples 1 and 2 cache it in a module-level variable
  (`postsPromise ??= fetchPosts()`) rather than calling `fetch` during render.
  Example 3 takes the other route: create the promise in a handler and store it
  in state.
- **`useFormState` is the older API.** React 19 renamed it to `useActionState`
  and moved it from `react-dom` to `react`; `useFormState` still works but is
  deprecated. The example uses the original name intentionally — migrating it is
  a one-line change worth doing as an exercise.
- **Tab 2 of the `useTransition` example is slow on purpose.** It renders 500
  items, each busy-waiting ~1ms, so the pending state is actually visible. The
  purity lint rule is disabled around that loop with an explanatory comment.

## Project structure

```
src/
  App.tsx                  # route table — one route per example
  main.tsx                 # mounts <App /> in <BrowserRouter> under StrictMode
  index.css                # the only stylesheet: @import 'tailwindcss'
  layouts/Layout.tsx       # header + <Outlet />, plus a "Back" link off the home page
  pages/Home.tsx           # the index of examples
  pages/NotFound.tsx       # catch-all 404
  components/<example>/    # one folder per example
```

Each example folder exports its entry component under an aliased name
(`export { Posts as ActionExample1 }`) so `App.tsx` can import several
same-named components without collisions.

## Conventions

- **TypeScript project references.** The root `tsconfig.json` is a solution file;
  `tsconfig.app.json` covers `src`, `tsconfig.node.json` covers `vite.config.ts`.
  A new build-time config at the repo root isn't type checked until it's added to
  `tsconfig.node.json`'s `include`.
- **Strict compiler settings that fail the build, not just lint:**
  `verbatimModuleSyntax` (type-only imports must be `import type { … }`),
  `erasableSyntaxOnly` (no `enum`, parameter properties, or `namespace`), and
  `noUnusedLocals` / `noUnusedParameters`.
- **Tailwind v4 is CSS-first.** It's wired up through the `@tailwindcss/vite`
  plugin plus a single `@import 'tailwindcss'` in `src/index.css`. There is
  deliberately no `tailwind.config.js` — theme customization goes in
  `@theme { … }` inside CSS.
- **Commits follow Conventional Commits** (`type(scope): subject`, subject under
  60 chars).

## Expanding the ESLint configuration

The flat config in [eslint.config.js](eslint.config.js) uses the non-type-aware
`typescript-eslint` recommended rules. For a production app, enable type-aware
linting:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

You can also install
[eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)
and
[eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)
for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```
