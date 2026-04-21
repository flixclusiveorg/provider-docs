---
name: flixclusive-provider-docs
description: >
  Skill for maintaining Flixclusive provider-docs (Next.js + MDX). Use this when updating docs to
  match the current core-stubs Provider SDK contracts.
---

# Flixclusive Provider Docs Skill

Use this skill when editing documentation in this `provider-docs` repo.

## How to use

- Read every rule file in `rules/` before making changes.
- Treat `core-stubs` as the source of truth for API signatures and model properties.

| Rule File | Scope |
|---|---|
| `rules/01-sdk-alignment.md` | Always. Prevents documenting non-existent APIs and captures key model contracts. |

## Quick validation

- Build the site: `npm run build`
