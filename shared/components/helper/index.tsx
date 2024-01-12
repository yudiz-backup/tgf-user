import { logEvent } from "firebase/analytics";
import { analytics } from "../firebaseConfig/config";

export const handleDownloadClick = () => {
    // Log a custom event when the link is clicked
    logEvent(analytics, 'android_CTA', {
      download_type: 'Android CTA',
    });
    window.fbq('trackCustom', 'android_CTA', {
      download_type: 'Android CTA',
    });
  };

  export const handleIosLinkClick = () => {
    // Log a custom event when the link is clicked
    logEvent(analytics, 'ios_CTA', {
      download_type: 'iOS CTA',
    });
    window.fbq('trackCustom', 'ios_CTA', {
      download_type: 'iOS CTA',
    });
  };