# Project Overview

This is a **Next.js** application designed to generate and share a "year-end" summary card (specifically for Pathao, based on file naming).

## Key Technologies

-   **Framework:** Next.js 16 (App Router)
-   **UI Library:** React 19
-   **Styling:** Tailwind CSS v4
-   **Image Generation:** `html-to-image` (for converting DOM elements to images)
-   **Linting & Formatting:** Biome
-   **Language:** TypeScript

## Architecture

The project follows the standard Next.js App Router structure:

-   `src/app`: Contains the application routes and pages.
    -   `page.tsx`: The main page handling the UI, image generation logic, and Web Share API integration.
    -   `layout.tsx`: Defines the root layout and font configurations (Geist Sans/Mono).
    -   `globals.css`: Global styles and Tailwind CSS setup.
-   `src/assets`: Stores static assets like images (e.g., `year-end-m.png`).

# Building and Running

## Prerequisites

-   Node.js environment (version compatible with Next.js 16)
-   Package manager (npm, yarn, pnpm, or bun)

## Scripts

The project uses `npm` scripts defined in `package.json`:

-   **Development Server:**
    ```bash
    npm run dev
    ```
    Runs the app in development mode at `http://localhost:3000`.

-   **Production Build:**
    ```bash
    npm run build
    ```
    Builds the application for production.

-   **Start Production Server:**
    ```bash
    npm run start
    ```
    Starts the production server after building.

-   **Linting:**
    ```bash
    npm run lint
    ```
    Runs Biome to check for linting errors.

-   **Formatting:**
    ```bash
    npm run format
    ```
    Formats the codebase using Biome.

# Development Conventions

## Styling
-   **Tailwind CSS v4:** The project uses the latest Tailwind CSS version.
-   **Theming:** CSS variables are defined in `src/app/globals.css` for background and foreground colors, supporting light/dark modes (though currently hardcoded to specific values).
-   **Fonts:** `next/font` is used with `Geist` and `Geist_Mono`.

## Code Quality
-   **Biome:** This project relies on Biome for both linting and formatting instead of ESLint/Prettier.
    -   **Configuration:** Rules are defined in `biome.json`.
    -   **Imports:** Biome handles `organizeImports`.

## Feature Specifics
-   **Image Generation:** The `html-to-image` library is used to capture a specific DOM element (`#output`) and convert it to a blob.
-   **Web Share API:** The app attempts to use the native `navigator.share` API for sharing the generated image. It falls back to a file download if sharing is not supported or fails.
-   **React Compiler:** Enabled in `next.config.ts`.
