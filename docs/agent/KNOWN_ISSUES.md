# Known Issues

Not a bug tracker. Only durable limitations future agents must not “fix” accidentally. Live status: `docs/PROJECT_STATUS.md`.

## Issue: PosConsole built but not on `/brokers`

Status: Open (intentional until asked)

Impact: `LiveConsole variant="pos"` works; `brokers.tsx` does not mount it.

Cause: Page composition not updated.

Current workaround: leave as-is.

Do not accidentally break: `PosConsole.tsx` or the `pos` variant while cleaning unused code — it is waiting to be wired.

---

## Issue: LiveConsole `payments` / `scheduling` are null

Status: Open

Impact: Those variant strings render nothing.

Cause: Payments shipped as `PaymentInfrastructureSection` instead. Scheduling never built.

Do not accidentally break: the payments section by “restoring” it into LiveConsole without a request.

---

## Issue: `MarketPathScroll` unused

Status: Open

Impact: Orphan landing component.

Cause: Homepage composition never mounted it.

Do not accidentally break: other landing sections while deleting it unless asked to delete.

---

## Issue: `.dark` class tokens are wrong for brand

Status: Open / by design

Impact: Enabling class dark mode would go purple-blue, not green-black.

Cause: shadcn default `.dark` vs `--dark` section token.

Current workaround: `bg-dark` bands only.

Do not accidentally break: light-page + `bg-dark` sections by adding `dark:` utilities that assume `.dark` on html.

---

## Issue: Contact / Login have no backend

Status: Open / by design

Impact: Forms and Login CTA do not authenticate or persist leads in this repo.

Cause: Marketing site.

Do not accidentally break: by inventing a fake API in `src/` without being asked.

---

## Issue: `styles.css` is very large; concurrent edits collide

Status: Ongoing

Impact: Agents appending at EOF can overwrite each other’s blocks.

Cause: Single-file CSS convention.

Current workaround: append a clearly marked unique prefix; don’t rewrite the file; don’t edit unrelated prefixes.

Do not accidentally break: `tpd-*`, `mkh-*`, `eih-*`, `apidoc-*`, `wic-glass-*`, `mi-*`, `mcb-*`, `ecb-*`, `brand-logo-*` when touching another page.

---

## Issue: Some marketplace channel labels in broker Market Intelligence

Status: Watch

Impact: Older console copy may include marketplace names. New copy must not add competitor product names.

Do not accidentally break: by expanding those names into other pages.
