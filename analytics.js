// analytics.js

// Replace 'YOUR_GA_MEASUREMENT_ID' with your actual Measurement ID (e.g., G-XXXXXXX)
const gaMeasurementId = 'G-S0YYB3MSRY';

function initGoogleAnalytics() {
    // 1. Create and inject the async gtag.js script provided by Google
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    document.head.appendChild(gtagScript);

    // 2. Initialize the dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }

    // Make gtag available globally for custom event tracking if needed later
    window.gtag = gtag;

    gtag('js', new Date());

    // 3. Configure the tracker with the Measurement ID
    gtag('config', gaMeasurementId);
}

// Initialize when the DOM is fully loaded or immediately if appropriate.
// For analytics, it's often fine to run immediately to catch early page views.
initGoogleAnalytics();
