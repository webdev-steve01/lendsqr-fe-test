To fulfill the requirement of a mock API without relying on paid services or unavailable tools, I served a local JSON file from the public/ folder and fetched it using the native fetch() API. This mirrors the behavior of a real API while ensuring data is accessible for testing and localStorage caching.

# Lendsqr FE Test

This is a frontend assessment project for Lendsqr, built with [Next.js](https://nextjs.org/) and TypeScript. The project demonstrates a dashboard UI, authentication, and data fetching using a mock API served from local JSON files. It uses modular components, custom hooks, and SCSS for styling.

## Features

- **Next.js** app with TypeScript for type safety
- Modular component structure for easy maintenance
- Custom hooks for data fetching and logic reuse
- SCSS modules and global styles for consistent theming
- Google Fonts and custom fonts integration
- Mock API using local JSON files in the `public/` folder
- Linting with ESLint and Next.js best practices

## Project Structure

## Mock API

To simulate API responses, local JSON files are placed in the `public/` folder and fetched using the native `fetch()` API. This approach allows for easy testing and development without relying on external services.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   npm run dev
   ```
