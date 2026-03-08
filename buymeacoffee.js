// buymeacoffee.js

// Replace 'YOUR_USERNAME' with your actual Buy Me A Coffee username
const bmcUsername = 'cudachen';

function initBuyMeACoffee() {
    // Inject styles for the button
    const style = document.createElement('style');
    style.innerHTML = `
        .bmc-btn-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
        }
        .bmc-btn-container:hover {
            transform: scale(1.05) translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 221, 0, 0.3);
            border-radius: 12px;
        }
        .bmc-btn-container img {
            height: 50px !important;
            width: 181px !important;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            display: block;
        }
    `;
    document.head.appendChild(style);

    // Create the link element
    const link = document.createElement('a');
    link.href = `https://www.buymeacoffee.com/${bmcUsername}`;
    link.target = '_blank';
    link.className = 'bmc-btn-container';
    link.setAttribute('aria-label', 'Buy Me a Coffee');

    // Create the image element
    const img = document.createElement('img');
    img.src = 'https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png';
    img.alt = 'Buy Me A Coffee';

    // Assemble and inject into DOM
    link.appendChild(img);
    document.body.appendChild(link);
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initBuyMeACoffee);
