# Lendsqr FE Assessment

This project is a frontend assessment for Lendsqr, built with **Next.js** and **TypeScript**. It demonstrates a modern dashboard application with authentication, user management, and responsive design, using a mock API and robust testing. Below, you'll find a detailed breakdown of the architecture, implementation choices, and features.

---

## Why Next.js?

- **Easy Routing System:** Next.js provides a file-based routing system, making it straightforward to organize pages and nested routes (e.g., `/dashboard/users/[id]` for user profiles).
- **API Routes:** Next.js allows you to create backend endpoints within the same project. I used this to serve mock user data with artificial latency, simulating real-world API calls.
- **Server-Side Rendering & Static Generation:** While not the focus here, Next.js enables scalable, SEO-friendly React apps.
- **Developer Experience:** Built-in TypeScript, fast refresh, and great error reporting.

---

## Mock Data Generation

- **Source:** User data was generated using [json-generator.com](https://json-generator.com/), allowing for realistic, varied mock users.
- **API Simulation:** Instead of importing JSON directly, I placed the data in a local file and exposed it via a Next.js API route (`https://osesojeh-sylvesterpaul-lendsqr-fe-test.vercel.app/api/users`). This adds network latency and mimics real API consumption, which is more realistic for testing loading states and error handling.
- **Enums:** Certain fields (e.g., gender, status, employment status) are stored as enums for consistency and easier mapping in the UI. To also simulate an encrypted backend.

  **Enum Mapping (fill in as needed):**

  - `gender`: 0 = Male, 1 = Female
  - `status`: 0 = Pending, 1 = Active, 2 = Blacklisted, 3 = Inactive
  - `employment_status`: 0 = Employed, 1 = Unemployed
  - `marital_status`: 0 = Single, 1 = Married

---

## Authentication

- **Form Handling:** Used [react-hook-form](https://react-hook-form.com/) for performant, accessible form state management.
- **Validation:** Integrated [Yup](https://github.com/jquense/yup) for schema-based validation.
  - Prevents empty fields and passwords shorter than 6 characters.
  - Shows inline validation errors for incorrect data.
- **Mock Flow:** No sign-up flow is provided (per requirements). The login form only allows access if the data is valid; otherwise, errors are shown.
- **Routing:** On successful login, the user is routed to the dashboard page using Next.js navigation.

---

## Dashboard

- **Responsive Table:**
  - On desktop (1250px and above), users are displayed in a table with columns for **Organization, Username, Email, Phone Number, Date Joined, Status**.
  - On mobile, the table is transformed into a card format for better readability. The table header (`thead`) is hidden, and a filter button is provided for mobile users.
- **Pagination:**
  - Implemented client-side pagination to efficiently handle large datasets.
- **Dynamic Data:**
  - Data is fetched from `/api/users` and displayed dynamically. All user fields are rendered according to their type and enum mapping.

---

## User Profile Page

- **Details Displayed:**
  - Clicking "View Details" on a user opens a detailed profile page.
  - All user information is shown, including personal info, employment, education, socials, and guarantors. these information is gotten from localstorage. instead of re-fetched again as per the submission requirements.
  - Tabs mock navigation between different sections (General Details, Documents, Bank Details, Loans, Savings, Apps & Systems).

---

## Testing

- **Testing Library:** Used [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/) for unit and integration tests.
- **Authentication Tests:**
  - Negative: Ensures validation errors appear for empty fields or short passwords.
  - Positive: Ensures successful login routes to the dashboard.
- **Dashboard Tests:**
  - Checks that table headers render.
  - Verifies pagination works (e.g., only 9 users per page, next/prev buttons function).
  - Ensures data displayed are correct.

---

## Technologies & Libraries Used

- **Next.js:** React framework for routing, SSR, and API routes.
- **TypeScript:** Type safety across the codebase.
- **React Hook Form:** Efficient form state management.
- **Yup:** Schema-based form validation.
- **Sass (SCSS):** Modular and maintainable styling.
- **Jest:** Unit and integration testing.
- **React Testing Library:** Testing React components in a user-centric way.
- **Framer Motion:** Animations for modals and transitions.
- **ESLint:** Code linting and style enforcement.
- **Other:** Next.js Image optimization, localStorage for caching.

---

## Folder structure of this Project

├── app/
│ ├── dashboard/  
│ ├── page.tsx
│ └── layout.tsx
├── components/
│ ├── auth/
│ ├── buttons/
│ ├── inputs/
│ ├── layout/
│ └── navigation/ (nav bar)
├── sections/ (main parts of the project)
│ ├── dashboard/
│ ├── userprofile/
│ └── authenticateuser/ (login page)
├── hooks/
├── lib/
├── public/
│ │── SVGs/
│ │── Fonts/
├── styles/
├── types/
├── **tests**/
├── jest.config.js
├── jest.setup.js
├── tsconfig.json
├── package.json
├── README.md
└── next.config.js

---

## How to Run

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Run Tests:
   ```sh
   npm test
   ```

---

This Project was hosted on vercel with the URL [https://osesojeh-stephen-sylvesterpaul-lendsqr-fe-test.vercel.app](https://osesojeh-stephen-sylvesterpaul-lendsqr-fe-test.vercel.app).
