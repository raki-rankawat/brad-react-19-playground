# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server with HMR (no type checking)
npm run build    # tsc -b (both projects) then vite build
npm run lint     # eslint .
npm run preview  # serve the production build from dist/
```

There is no test framework configured. `npm run dev` does **not** type check — Vite strips types without checking them, so run `npm run build` (or `npx tsc -b`) to surface type errors.

## Stack

Vite 8 + React 19.2 + TypeScript 6 + Tailwind CSS v4.

Commits follow Conventional Commits (`type(scope): subject`, subject under 60 chars) with **no `Co-Authored-By` trailer** — see the `commit-msg` skill in [.claude/skills/commit-msg/](.claude/skills/commit-msg/SKILL.md), which generates the message from the staged diff and commits.

## Architecture

Started from the `create-vite` React+TS template with Tailwind v4 layered on; the template's demo UI and assets have since been stripped out. `src/main.tsx` mounts `App` into `#root` under `StrictMode`; `src/App.tsx` currently renders a single `<h1>`. There is no router, state library, or data layer, and `src/` holds only those three files plus `index.css`.

**TypeScript project references.** The root `tsconfig.json` is a solution file with no sources of its own; it references two real projects:

- `tsconfig.app.json` — `include: ["src"]`, DOM libs, `types: ["vite/client"]`, `moduleResolution: "bundler"`
- `tsconfig.node.json` — `include: ["vite.config.ts"]`, `types: ["node"]`, `module: "nodenext"`

A new build-time config file at the repo root (e.g. a Vitest or Playwright config) will not be type checked unless it is added to `tsconfig.node.json`'s `include`.

Both projects enable `verbatimModuleSyntax` (type-only imports must be written `import type { … }`), `erasableSyntaxOnly` (no `enum`, no parameter properties, no `namespace`), and `noUnusedLocals` / `noUnusedParameters` — all of which fail the build, not just lint.

**Tailwind v4 is CSS-first.** It is wired through the `@tailwindcss/vite` plugin in [vite.config.ts](vite.config.ts) plus a single `@import 'tailwindcss'` in [src/index.css](src/index.css). There is deliberately **no `tailwind.config.js`** — theme customization goes in `@theme { … }` inside a CSS file, not a JS config.

`src/index.css` is the only stylesheet and contains only that import — there are no hand-written base styles or design tokens, and Tailwind's preflight reset is in effect (so a bare `<h1>` renders at body text size until utilities are applied). Style with utility classes; put any custom theme values in `@theme { … }` in `index.css`.

**Assets.** `public/` holds only `favicon.svg`, referenced by absolute URL from `index.html`. Files there are copied verbatim and must use absolute paths; anything imported as a module from `src/` goes through Vite's asset pipeline and gets hashed. Pick the right directory accordingly — the two are not interchangeable.

## ESLint

Flat config in [eslint.config.js](eslint.config.js), applying to `**/*.{ts,tsx}` only: `@eslint/js` recommended, `typescript-eslint` recommended (**not** type-aware), `eslint-plugin-react-hooks` flat/recommended, and `eslint-plugin-react-refresh` vite config. The react-refresh rule is why component files should export components only — mixing a component and a non-component export in one file breaks fast refresh and will warn.

`README.md` documents how to upgrade to type-aware rules (`recommendedTypeChecked` / `strictTypeChecked` plus `parserOptions.project`) if that becomes worthwhile.
