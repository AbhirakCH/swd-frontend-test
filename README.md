# SWD Frontend Test

This is a Next.js frontend application developed for the SWD Frontend Test. It demonstrates proficiency in React, TypeScript, Ant Design, Redux Toolkit, and SCSS.

## Features

The application consists of two main tests accessible from the landing page:

### Test 1: Layout & Style

A shape manipulation tool that demonstrates layout skills and state management.

- **Move Shape**: Shifts shapes cyclically to the left.
- **Move Position**: Swaps the top and bottom rows of shapes.
- **Randomize Position**: Randomly shuffles the shapes.
- **Responsive Design**: Adapts to different screen sizes.
- **Internationalization**: Supports English and Thai languages.

### Test 2: Form & Table

A user management system demonstrating form handling, validation, and data persistence.

- **User Form**:
  - Comprehensive validation (Citizen ID, Mobile Phone, Required fields).
  - Data persistence using `localStorage`.
  - Edit and Reset functionality.
- **User Table**:
  - Pagination with custom "PREV"/"NEXT" controls.
  - Sorting by Name, Gender, and Nationality.
  - Bulk delete and single delete capabilities.
  - Select all/Select current page functionality.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Ant Design](https://ant.design/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [SCSS](https://sass-lang.com/) (Modules)
- **Internationalization**: [react-i18next](https://react.i18next.com/)
- **Date Handling**: [Day.js](https://day.js.org/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (or npm/yarn)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd swd-frontend-test
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Running Locally

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the application for production:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages and layouts
│   ├── form-table/      # Route for Test 2
│   ├── layout-style/    # Route for Test 1
│   ├── loading.tsx      # Global loading state
│   └── page.tsx         # Landing page
├── components/          # Reusable components (Header, HomeButton, etc.)
├── features/            # Feature-specific components
│   ├── form-table/      # Components for Test 2 (UserForm, UserTable)
│   └── layout-style/    # Components for Test 1 (LayoutStyle)
├── lib/                 # Utilities, hooks, and Redux store configuration
│   ├── features/        # Redux slices
│   ├── hooks.ts         # Typed Redux hooks
│   └── i18n.ts          # Internationalization config
└── styles/              # Global styles
```
