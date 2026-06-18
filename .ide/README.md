# Team AI IDE config

Git-tracked rules and skills for AI-assisted work in **sporteev-components**.

Works with **Cursor**, **Claude Code**, and **Kiro** — one source of truth, wired per tool by the setup script.

## One-time setup

Run the command for your IDE (repeat if you use more than one):

```bash
pnpm setup:ide:cursor   # Cursor
pnpm setup:ide:claude   # Claude Code
pnpm setup:ide:kiro     # Kiro
```

Or pass flags directly: `pnpm setup:ide -- ide:cursor ide:claude`

This wires `.ide/` into your tool's local directory (gitignored):

| Tool        | Rules / steering                | Skills                           |
| ----------- | ------------------------------- | -------------------------------- |
| Cursor      | `.cursor/rules` → `.ide/rules`  | `.cursor/skills` → `.ide/skills` |
| Claude Code | `.claude/rules` → `.ide/rules`  | `.claude/skills` → `.ide/skills` |
| Kiro        | `.kiro/steering` → `.ide/rules` | `.kiro/skills` → `.ide/skills`   |

Rules use `.mdc` (Cursor format with YAML frontmatter). Claude and Kiro read them as markdown.

## Rules & skills

| Path                            | Purpose                                 | Globs                                |
| ------------------------------- | --------------------------------------- | ------------------------------------ |
| `rules/scope.mdc`               | Package scope, semver, deps             | always apply                         |
| `rules/component-structure.mdc` | Layers, folders, exports, TS            | `atoms/`, `molecules/`, `organisms/` |
| `rules/component-api.mdc`       | Props, types.ts, forwardRef, controlled | `atoms/`, `molecules/`, `organisms/` |
| `rules/component-styling.mdc`   | No CVA, sizes/variants, icon wrappers   | `atoms/`, `molecules/`, `organisms/` |
| `rules/radix-primitives.mdc`    | Radix wrap pattern, a11y, bundled deps  | `molecules/`, `organisms/`           |
| `rules/icons.mdc`               | Custom icon implementation              | `icons/`                             |
| `rules/storybook.mdc`           | Stories + icon catalog                  | `*.stories.tsx`                      |
| `rules/theme.mdc`               | Tokens, theme.css, JIT                  | `src/theme/`, scripts                |
| `rules/typescript.mdc`          | import type, build, lint/format        | `**/*.{ts,tsx}`                      |
| `skills/new-component/`         | Agent workflow                        | on demand                            |

Human-readable summary: `contributing.md`.

## Multi-repo workspaces

Each repo has its own `.ide/`. Consumer apps may add a local `.ide` later.
