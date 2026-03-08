# Number Vault

A web application to record, query, and manage numeric sets.

> **Note**: This project was proudly bootstrapped and built with the help of **Antigravity**, a powerful AI coding assistant created by the Google Deepmind team. 🚀

## Features

- **Record Numbers**: Input and save your numeric sets.
- **Subset Querying**: Query existing records by providing a subset of numbers.
- **Automatic Record Expansion**: If a new, larger set containing an existing record's numbers is added, the system automatically expands/replaces the existing subset with the new larger set.
- **Ascending Order Output**: All numbers and records are always sorted and displayed in ascending order.
- **Import/Export Feature**: Export your recorded numbers to a file and import them back into the application.

## Tech Stack

- **HTML5**
- **CSS3** (Vanilla)
- **JavaScript** (Vanilla ES6+)

## Deployment

Since this project consists entirely of static front-end files (`index.html`, `index.css`, `app.js`), it does not require a backend runtime to function and can be deployed on any static web server.

### Local Development

To run the application locally, simply serve the directory with any local development server.

**Using Node.js:**
```bash
npx serve .
```

**Using Python:**
```bash
python3 -m http.server
```

Then navigate to `http://localhost:3000` (Node.js) or `http://localhost:8000` (Python) in your browser.

### Production Deployment

You can host this project for free on static hosting platforms by linking your code repository:

- **Vercel**: Deploy the root directory.
- **Netlify**: Deploy the root directory.
- **GitHub Pages**: Go to Settings -> Pages and deploy from the main branch.
