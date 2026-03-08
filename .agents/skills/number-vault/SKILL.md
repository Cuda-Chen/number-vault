---
name: Interact with Lottery Number Tracker
description: Instructions and guidelines for agents interacting with or modifying the Lottery Number Tracker application.
---

# Interact with Lottery Number Tracker

This skill provides context and rules for AI agents modifying the Lottery Number Tracker web application.

## Project Structure

- `index.html`: The main entry point and UI layout.
- `index.css`: Styling for the application.
- `app.js`: Client-side JavaScript handling all business logic, DOM manipulation, and data persistence (using `localStorage`).

## Core Business Logic Rules

When modifying `app.js` or the data structure, keep the following constraints in mind:

1. **Ascending Order Guarantee**:
   - Every individual lottery ticket or record must be sorted in ascending numerical order.
   - Any output or display of numbers must maintain this order.

2. **Subset Querying**:
   - The query function must check if a given list of numbers is a *subset* of an existing record.
   - If a user inputs `1, 2`, it should match any saved records containing `1, 2` (e.g., `1, 2, 5, 10, 20`).

3. **Automatic Record Expansion**:
   - When adding a new record, the application must check if the new record is a *superset* of an already existing smaller record.
   - If it is a superset, the smaller record should be removed/replaced by the new larger record to avoid redundant subsets.

4. **Import/Export Format**:
   - The application supports exporting the saved records (e.g., as JSON) and importing them back.
   - Make sure any changes to the data schema include backward compatibility or migrations for the import/export functionality.

## Modification Guidelines

1. **No Backend Frameworks**: This is a standalone vanilla HTML/CSS/JS application. Do not introduce front-end frameworks like React or build tools like Webpack unless explicitly requested by the user.
2. **Rich, Modern Aesthetics**: Maintain a visually stunning and dynamic aesthetic. Use modern CSS (Grid, Flexbox, smooth transitions, subtle glassmorphism) to ensure the interface feels premium and state of the art. Do not use generic styles.
3. **Data Storage**: As there is no backend, all recorded lottery numbers must persist using Browser Local Storage.
