# Specification

## Summary
**Goal:** Update the `/apk-download` default APK filename to the current release (Version 20) and align related documentation.

**Planned changes:**
- Update the `/apk-download` page logic so that when no `?filename=...` query parameter is provided, it defaults to `strager-marketplace-v20.apk` (instead of `strager-marketplace-v1.apk`).
- Ensure the generated default direct download URL uses `/downloads/strager-marketplace-v20.apk`.
- Ensure the generated default shareable page link uses `/apk-download?filename=strager-marketplace-v20.apk`.
- Update `frontend/public/downloads/README.txt` examples to reference Version 20 (`strager-marketplace-v20.apk`) as the current default.

**User-visible outcome:** Visiting `/apk-download` without query parameters shows and generates download/share links for `strager-marketplace-v20.apk` by default, and the downloads README reflects the same default.
