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
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── prefill-form/# Form-related components
│   └── react-flow/  # Flow diagram components
├── context/         # React Context providers
├── lib/             # Utility functions and helpers
├── service/         # Business logic and services
├── state/           # State management
└── types/           # TypeScript type definitions
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Key Technologies

- **React 19** - Latest version of React
- **TypeScript** - For type safety
- **Vite** - Fast development and building
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible components
- **React Flow** - Interactive node-based editor

### Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

## 🧪 Testing

_Note: Testing infrastructure is currently being set up_

## 📝 Adding New Features

1. **New Components**

   - Place reusable UI components in `src/components/ui`
   - Feature-specific components should go in their respective feature folders

2. **API Integration**

   - Add new API endpoints in `src/api/api.ts`
   - Use the configured axios instance from `src/api/axios.ts`

3. **State Management**

   - Use React Context for global state
   - Keep component-specific state local when possible
