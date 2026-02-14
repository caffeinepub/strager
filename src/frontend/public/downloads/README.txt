# APK and AAB Hosting Instructions

This folder is for hosting Android APK and AAB files that users can download.

## APK vs AAB - Important Distinction

**APK (Android Package):**
- Used for direct installation on Android devices
- Can be downloaded and installed by users outside of the Play Store
- This is what you should host in this /downloads/ folder for direct installation
- Use the /apk-download page to generate and share APK download links

**AAB (Android App Bundle):**
- Required for Google Play Store submission only
- Cannot be installed directly on devices like an APK
- Must be uploaded to Google Play Console for distribution
- Google Play Console converts AAB to optimized APKs for different devices
- You can host AAB files here for download, but they are only for Play Console upload
- Use the /aab-download page to generate and share AAB download links

**Important:** APKs cannot be converted to AABs. If you need an AAB for Play Store submission, 
you must rebuild your app from the Android wrapper project using the AAB build configuration.

## How to Use

1. **Place Your APK or AAB File Here**
   - Copy your built APK file (e.g., app-release.apk) or AAB file (e.g., app-release-v22.aab) into this folder
   - The file will be automatically served as a static asset

2. **Recommended Naming Convention**
   Use versioned naming to help users identify the correct version:
   - For APK: strager-marketplace-v21.apk, strager-marketplace-v22.apk, etc.
   - For AAB: app-release-v21.aab, app-release-v22.aab, etc.
   
   Note: The current default APK filename on /apk-download is strager-marketplace-v21.apk
   Note: The current default AAB filename on /aab-download is app-release-v22.aab

3. **Public URL Format**
   Your files will be accessible at:
   https://your-domain.com/downloads/<filename>.apk
   https://your-domain.com/downloads/<filename>.aab
   
   Examples:
   https://your-domain.com/downloads/strager-marketplace-v21.apk
   https://your-domain.com/downloads/app-release-v22.aab

4. **Using the Filename Parameter**
   Both the /apk-download and /aab-download pages support a filename parameter to dynamically generate the download link:
   
   For APK (current default is v21):
   https://your-domain.com/apk-download?filename=strager-marketplace-v21.apk
   
   For AAB (current default is v22):
   https://your-domain.com/aab-download?filename=app-release-v22.aab
   
   - The page will automatically construct the full download URL
   - Users can download or copy the link directly from the page
   - If no filename is provided, the default filename is used

5. **Updating Between Releases**
   - Replace the old file with the new version
   - Use a new filename with an incremented version number
   - This prevents users from downloading cached old versions
   - Update the filename parameter in your shared links to point to the new version
   - Example: /aab-download?filename=app-release-v23.aab

6. **Important Reminders**
   - Use versioned filenames to avoid browser caching confusion
   - Keep only the current version to avoid confusion
   - Test the download link after uploading to ensure it works correctly
   - If the link returns 404, verify the file exists in frontend/public/downloads/ and the filename matches exactly
   - Consider file size - APKs and AABs can be large and may take time to download on slow connections

## Security Notes

- Only distribute APKs and AABs that you have built and signed yourself
- Never share your signing keys or keystore files
- Inform users to verify the filename and version before installing (APK) or uploading (AAB)
- Consider providing SHA-256 checksums for users to verify file integrity

## For More Information

See the download guide pages for detailed instructions:
- APK Download Guide: /apk-download
  * Developer instructions for hosting APKs
  * Dynamic download link generation with filename parameter support
  * End-user installation instructions for Android
  * Security best practices
  * Current default: strager-marketplace-v21.apk

- AAB Download Guide: /aab-download
  * Developer instructions for hosting AABs
  * Dynamic download link generation with filename parameter support
  * Play Console upload instructions
  * Important notes about AAB vs APK usage
  * Current default: app-release-v22.aab
