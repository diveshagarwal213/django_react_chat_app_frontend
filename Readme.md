# Frontend of Django Chat Application

## Overview

This is the frontend of a Django-based chat application, built using Vite, React, and TypeScript. The frontend is designed to be highly performant and responsive, utilizing modern tools and libraries such as Zustand for state management, TanStack Query for data fetching and caching, Material UI for UI components, and Tailwind CSS along with SCSS for styling.

## Features

- **Vite with React and TypeScript**: The project uses Vite for fast development and builds, with React and TypeScript providing a robust and type-safe frontend framework.
- **State Management with Zustand**: Zustand is used for simple and scalable state management.
- **Query Management with TanStack Query**: Handles server-state management, including data fetching, caching, and synchronization with the backend.
- **UI Components with Material UI**: Provides a rich set of customizable components, ensuring a consistent and accessible user interface.
- **Styling with Tailwind CSS and SCSS**: Combines utility-first styling with Tailwind CSS and the flexibility of SCSS for custom styles.
- **Default Host and Port**: The application runs on `http://localhost:5003` by default.

## Setup

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>/frontend

   ```

1. **Install Dependencies:**:
   ```bash
    npm install
        # or
    yarn install
   ```

### Development

1. **Start the Development Server:**:

   ```bash
    npm run dev
        # or
    yarn dev
   ```

## Configuration

### Vite Configuration

- **Vite** is configured through the `vite.config.ts` file, which handles the build process, plugins, and environment variables.
- Key settings include:
  - **Server Configuration**: Specifies the host and port (`localhost:5003`), and enables CORS to interact with the Django backend.
  - **Plugins**: Includes necessary plugins for handling React, TypeScript, and CSS/SCSS files.
  - **Environment Variables**: Managed through `.env` files, enabling easy switching between development, staging, and production environments.

### TypeScript Configuration

- **TypeScript** is configured using the `tsconfig.json` file, which defines the compiler options and paths for the project.
- Key configurations include:
  - **Strict Mode**: Ensures strong type checking throughout the project, reducing runtime errors.

### Tailwind CSS Configuration

- **Tailwind CSS** is configured in the `tailwind.config.js` file, allowing you to customize the theme, extend the default styles, and set up responsive breakpoints.
- Important configurations:
  - **PurgeCSS**: Removes unused CSS in production builds for optimized performance.
  - **Theme Customization**: Custom colors, fonts, and spacing can be added to the theme section.
  - **Plugins**: Additional Tailwind plugins can be integrated for extended functionality.

### Zustand Store Configuration

- The **Zustand** store is set up in the `/src/store` directory.
- The store manages global state, including user sessions, authentication status, and real-time data from WebSocket connections.
- The store is modular, with separate files handling different slices of state, making it easy to maintain and scale.

### TanStack Query Configuration

- **TanStack Query** (formerly React Query) is configured globally in the project, with custom hooks set up in `/src/hooks`.
- Key configurations:
  - **Query Client**: The query client is initialized with default settings for caching, retrying failed requests, and managing query states.
  - **Custom Hooks**: Hooks like `useCreateChatMessageApiHook`, and `useListUserApiHook` are set up to handle specific queries and mutations, ensuring efficient data management.

### Material UI Theme Configuration

- **Material UI** is customized using a theme provider located in `/src/theme`.
- The theme is extended with custom colors, typography, and components that align with the overall design.
- Tailwind CSS is used in combination with Material UI to maintain design consistency across the application.

### SCSS Configuration

- **SCSS** is used alongside Tailwind CSS to handle more complex and specific styles.
- SCSS files are organized by components and pages in the `/src/styles` directory, allowing for modular and maintainable CSS.
- The Vite configuration is set up to handle SCSS preprocessing, integrating it seamlessly with the rest of the project's CSS.

### Environment Variables

- **.env** files manage environment-specific configurations, such as API endpoints and WebSocket URLs.
- Key variables include:
  - `VITE_API_BASE_URL`: Base URL for the Django REST API.
  - `VITE_WS_BASE_URL`: WebSocket URL for real-time communication with Django Channels.
  - **Development vs Production**: Different `.env` files can be used for development, staging, and production environments to ensure correct configurations across various deployment stages.
