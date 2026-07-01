# Contributing to Shri Hari Jewellers

First off, thank you for considering contributing to the Shri Hari Jewellers platform! It's people like you that make such platforms amazing.

## Setup Local Environment

1. Fork and clone the repo.
2. Run `npm install` to install dependencies.
3. Ask the repository owner for the `.env.local` variables for Sanity connection.
4. Run `npm run dev` to start the development server on `http://localhost:3000`.

## Branching Strategy

- `main`: The production branch. Direct commits are restricted.
- `feature/*`: For new features (e.g. `feature/dynamic-pricing`).
- `bugfix/*`: For bug fixes (e.g. `bugfix/mobile-menu-overlap`).

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3. You may merge the Pull Request in once you have the sign-off of the repository owner.

## Coding Standards

- **TypeScript**: Use strict typing. Avoid `any` wherever possible.
- **Tailwind CSS**: Use Tailwind for all styling. Custom CSS should only be added to `globals.css` if absolutely necessary.
- **Components**: Follow the Atomic Design pattern (atoms, molecules, organisms).

Thank you for your contributions!
