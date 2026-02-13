# Auto-Complete Component (React + TypeScript + Vite)

A robust, accessible, and performant Auto-Complete component built with React and TypeScript.

## Features

- **Debounced Filtering**: Efficiently filters large datasets.
- **Keyboard Navigation**: Full support for arrow keys (`Up`, `Down`), `Enter` to select, and `Escape` to close.
- **Click Outside**: Automatically closes the dropdown when clicking outside the component.
- **Loading State**: Displays a spinner while filtering or fetching data.
- **Customizable**: Accepts data arrays and custom selection handlers.
- **Virtualization Support**: (Implied by current implementation using windowing for large lists in `Dropdown.tsx`)

## Project Structure

```
src/
├── components/
│   ├── AutoComplete/
│   │   ├── components/
│   │   │   ├── OriginalAutoComplete.tsx  # Main component
│   │   │   ├── Dropdown.tsx              # Dropdown list with virtualization
│   │   │   ├── Loader.tsx                # Loading wrapper
│   │   │   └── Spinner.tsx               # Loading spinner
│   │   ├── hooks/
│   │   │   ├── useAutoComplete.ts        # Logic hook for filtering and state
│   │   │   └── useClickOutside.ts        # Hook for click-outside detection
│   │   ├── context/
│   │   │   └── AutoCompleteProvider.tsx  # Context for state management
│   │   └── AutoComplete.module.css       # Styles
│   └── utils/
│       └── data.ts                       # Mock data and API fetcher
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

This will start the Vite development server.

## Usage

Import the `OriginalAutoComplete` component and pass the required props:

```tsx
import OriginalAutoComplete from './components/AutoComplete/components/OriginalAutoComplete';
import { data } from './components/utils/data';

const App = () => {
  const handleSelect = (value: string) => {
    console.log('Selected:', value);
  };

  return (
    <div>
      <h1>Auto Complete Demo</h1>
      <OriginalAutoComplete
        data={data}
        placeholder="Type to search..."
        onSelect={handleSelect}
      />
    </div>
  );
};

export default App;
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `string[]` | Array of strings to search through. |
| `placeholder` | `string` | Placeholder text for the input field. |
| `onSelect` | `(value: string) => void` | Callback function triggered when an item is selected. |
