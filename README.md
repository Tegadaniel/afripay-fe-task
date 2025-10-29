# Afripay Transaction Dashboard

A modern, responsive React-based transaction management dashboard built for the Afripay Frontend Engineer Assessment.

## Features

- **Transaction Management**: Add, view, and delete transactions with ease
- **Smart Filtering**: Filter transactions by type (All, Credits, Debits)
- **Summary Statistics**: Real-time calculation of total inflow, outflow, and net balance
- **Data Persistence**: All transactions are automatically saved to localStorage
- **CSV Export**: Download filtered transactions as CSV for external analysis
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with a dark theme and intuitive interactions

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: Browser localStorage API

## Component Structure

\`\`\`
src/
├── app/
│   ├── page.tsx                 # Main dashboard page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── transaction-summary.tsx  # Summary cards (inflow, outflow, balance)
│   ├── transaction-form.tsx     # Form to add new transactions
│   ├── transaction-list.tsx     # List container with export button
│   ├── transaction-item.tsx     # Individual transaction row
│   ├── transaction-filters.tsx  # Filter buttons
│   └── export-button.tsx        # CSV export functionality
└── types/
    └── transaction.ts           # TypeScript interfaces
\`\`\`

## Key Design Decisions

### 1. **Component Architecture**
- **Separation of Concerns**: Each component has a single responsibility (form, list, summary, filters)
- **Reusability**: Components are designed to be easily reusable and testable
- **Props-based Communication**: Clean data flow through props and callbacks

### 2. **State Management**
- **Local State with Hooks**: Used `useState` for form state and transaction list
- **localStorage Persistence**: Transactions are automatically synced to localStorage on every change
- **Hydration Safety**: Loading state prevents hydration mismatches in Next.js

### 3. **Data Flow**
\`\`\`
Home (main state) 
  ├── TransactionSummary (read-only)
  ├── TransactionForm (add transaction)
  ├── TransactionFilters (filter state)
  └── TransactionList
      └── TransactionItem (delete transaction)
\`\`\`

### 4. **Styling Approach**
- **Tailwind CSS**: Utility-first approach for consistent, maintainable styling
- **Dark Theme**: Professional dark interface with emerald accents for positive actions
- **Color Coding**: Green for credits/inflow, red for debits/outflow, blue for balance
- **Responsive**: Mobile-first design with responsive grid layouts

### 5. **localStorage Implementation**
- Transactions are loaded on component mount
- Changes are automatically persisted after initial load
- Prevents hydration issues in Next.js SSR

### 6. **Export Feature**
- CSV format for maximum compatibility
- Includes all transaction fields
- Filename includes export date for easy organization
- Respects current filter state

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd afripay-transaction-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Usage

### Adding a Transaction
1. Click the "+ Add Transaction" button
2. Fill in the form fields:
   - **Description**: What the transaction is for
   - **Amount**: Transaction amount in Naira (₦)
   - **Type**: Select Credit (inflow) or Debit (outflow)
   - **Date**: Transaction date (defaults to today)
3. Click "Add Transaction"

### Filtering Transactions
- Click filter buttons to view:
  - **All Transactions**: Show all entries
  - **Credits**: Show only incoming transactions
  - **Debits**: Show only outgoing transactions

### Exporting Data
- Click the "↓ Export CSV" button to download filtered transactions
- File will be named `transactions-YYYY-MM-DD.csv`

### Deleting Transactions
- Click the "Delete" button on any transaction to remove it

## Data Persistence

All transactions are automatically saved to your browser's localStorage. This means:
- Data persists across browser sessions
- No backend server required
- Data is stored locally on your device
- Clearing browser data will remove all transactions

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Performance Considerations

- **Efficient Filtering**: Transactions are filtered client-side with O(n) complexity
- **Optimized Re-renders**: Components only re-render when their specific props change
- **localStorage Limits**: Typically 5-10MB per domain (sufficient for thousands of transactions)

## Future Enhancements

- Excel (XLSX) export format
- Transaction categories and tags
- Search functionality
- Date range filtering
- Recurring transactions
- Budget tracking
- Data visualization charts
- Cloud sync with backend

## Troubleshooting

### Transactions not persisting?
- Check if localStorage is enabled in your browser
- Clear browser cache and try again

### Export button not working?
- Ensure you have at least one transaction
- Check browser console for errors

### Form not submitting?
- Ensure all fields are filled in
- Check that amount is a valid number

## License

This project is part of the Afripay Frontend Engineer Assessment.

## Contact

For questions or issues, please reach out to the Afripay team.
