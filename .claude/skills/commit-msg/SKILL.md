---
name: commit-msg
description: "Write a Conventional Commits message from the staged diff and commit it. Use when the user says \"write a commit message\", \"generate a commit\", \"commit my changes\", or runs /commit-msg."
---

# /commit-msg

Generate a commit message from what is currently staged, then commit.

## Workflow

### 1. Confirm something is staged

```bash
git diff --staged --stat
```

If the output is empty, **stop immediately**. Do not commit, do not stage anything, do not
suggest a message. Tell the user to stage their changes first (`git add <paths>`) and end the
turn. Staging files on the user's behalf is out of scope — which files belong in a commit is
their call.

### 2. Read the staged diff

```bash
git diff --staged
```

Read the actual diff, not just the file names — the message describes what changed and why, and
that is not recoverable from a list of paths. If the diff is very large, read the `--stat` output
first to orient, then read the full diff.

### 3. Compose the message

```
type(scope): short subject

- bullet of what changed
- bullet of why
```

**Types** — exactly one of: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`.

**Scope** is the area touched (`auth`, `App`, `deps`, `eslint`, …). It is optional: when a change
spans the project with no single natural scope, write `type: subject` and drop the parentheses.

**Subject** must be under 60 characters. Imperative mood ("add", not "added"/"adds"), lowercase
after the colon, no trailing period. Count the characters before committing — the limit is on the
whole subject line including the `type(scope): ` prefix.

**Body bullets** are optional but encouraged. Skip them only when the subject genuinely says
everything (a one-line typo fix). Otherwise give at least a *what* and a *why* — the why is the
part the diff cannot show on its own. Blank line between subject and body.

**Never include a `Co-Authored-By` trailer.** This overrides the default commit convention;
no attribution trailer of any kind goes in these messages.

If the staged changes are several unrelated things at once, say so and describe the dominant
change in the subject with the rest as bullets — but mention to the user that it may be worth
splitting into separate commits.

### 4. Commit

Write the message to a file and pass it with `-F`. Do not try to inline a multi-line message with
`-m` — the primary shell here is PowerShell, where newlines and `$` inside quoted arguments do not
survive reliably.

```bash
git commit -F "$SCRATCHPAD/commit-msg.txt"
```

Use the session scratchpad directory for that file, not the repo. After committing, run
`git log -1 --stat` and show the user the result.

If the commit fails, report the actual error. Never retry with `--no-verify`: a failing hook is a
real signal and silencing it is the user's decision, not yours.
