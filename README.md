# React Journey Builder

React application implemneted to support form journey builder.
App is using multiple forms connected via [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph). Main functionality is to first preview the forms, than to determine how the fields will be populated.
Fields can be populated either by inheriting global fields or by inheriting the fields from predecessors of the form node.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Dragan2402/react-journey-builder.git
cd react-journey-builder
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── api/              # API integration and axios configuration
├── assets/           # Static assets, currently only images.
├── components/       # React components
│   ├── ui/           # Reusable UI components. Based on Shadcn component library
│   ├── prefill-form/ # Form-related components
│   └── react-flow/   # React flow diagram related components
├── context/          # React Context providers
├── lib/              # Utility functions and helpers
├── test/             # Test setup utilities
├── service/          # Business logic and services. Currenlty only containing mapping related processes
├── state/            # State management, handling state manipulation
└── types/            # TypeScript type definitions, including dtos, internal and state related
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Key Technologies

- **[React 19](https://react.dev/)** - Latest version of React
- **[TypeScript](https://www.typescriptlang.org/)** - For type safety
- **[Vite](https://vite.dev/)** - Fast development and building
- **[Vitest](https://vitest.dev/)** - vite testing framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Shadcn component library](https://ui.shadcn.com/)**
- **[React flow](https://reactflow.dev/)** - A customizable React component for building node-based editors and interactive diagrams

### Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

## 🧪 Testing

The project uses a comprehensive testing setup with the following structure:

### Test Directory Structure

```
src/
├── test/           # Test configuration and setup
│   └── setup.ts    # Test environment configuration
└── components/     # Component tests are co-located with components
```

### Testing Tools

- **Vitest** - Fast unit testing framework
- **React Testing Library** - For testing React components
- **MSW (Mock Service Worker)** - For API mocking
- **@testing-library/jest-dom** - Custom DOM element matchers

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests with ui display
npm run test:ui
```
