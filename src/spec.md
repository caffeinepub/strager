# Specification

## Summary
**Goal:** Provide clear, English, step-by-step instructions for building an installable Android APK (and AAB for Play Store) using common wrapper approaches, and direct users to the right guide when they ask for an APK.

**Planned changes:**
- Update `/mobile-app-packaging` with a clearly labeled “Build an APK (Android)” section that explains APK vs AAB and gives a sequential checklist for building via Android Studio WebView wrapper and/or Trusted Web Activity (TWA).
- Ensure the Android packaging steps reference the deployed site origin shown on the page as the start URL to package.
- Add a “Trusted Web Activity (TWA) prerequisite” subsection referencing `frontend/public/.well-known/assetlinks.json`, instructing users to replace `PACKAGE_NAME_HERE` and `SHA256_FINGERPRINT_HERE`, and pointing to `frontend/public/.well-known/assetlinks.README.txt` for how to obtain those values.
- Add an easy-to-notice callout on `/install` clarifying that PWA install works via the browser, but APK creation/testing requires following the `/mobile-app-packaging` guide (with a link).

**User-visible outcome:** Users can follow a dedicated, step-by-step guide to produce an Android APK for testing (and an AAB for Play Store) using external Android tooling, and `/install` clearly directs APK seekers to the packaging guide.
