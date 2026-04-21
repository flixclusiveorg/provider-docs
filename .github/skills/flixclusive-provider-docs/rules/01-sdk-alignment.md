# 01 — SDK Alignment (Read First)

These rules override all other guidance when working in this repository.

## Source of truth

Use this order:

1. The current `core-stubs` public API (signatures + properties)
2. Existing `provider-docs` pages and components
3. The provider template example provider (for patterns)

## Non-negotiables

- Do not document SDK APIs that do not exist.
- Keep examples compiling against the current SDK surface.
- Prefer small, targeted doc edits tied to the requested API change.

## MediaLink contract (important)

When documenting media links, assume:

- `MediaLink` exposes constraints via `flags: Set<Flag>?`.
- Do not reference `MediaLink.isThirdPartyGateway` or `MediaLink.thirdPartyGatewayInfo` (not part of the model).
- Auth headers are represented with `Flag.RequiresAuth(customHeaders = ...)`.
  - Consumers can read `MediaLink.customHeaders` to get those headers.
- Third-party handoffs are represented with `Flag.ThirdPartyGateway(...)`.

### Inspecting flags in examples

If you need to show how to read a specific flag type in Kotlin examples, either:

- Filter `flags` manually, or
- Use the helper (requires import):
  - `import com.flixclusive.model.provider.link.MediaLink.Companion.getFlagOfType`
  - `val gateway = mediaLink.getFlagOfType<Flag.ThirdPartyGateway>()`
