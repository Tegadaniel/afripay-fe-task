"use client"

interface TransactionFiltersProps {
  filter: "all" | "credit" | "debit"
  onFilterChange: (filter: "all" | "credit" | "debit") => void
}

export default function TransactionFilters({ filter, onFilterChange }: TransactionFiltersProps) {
  const filters = [
    { value: "all" as const, label: "All Transactions" },
    { value: "credit" as const, label: "Credits" },
    { value: "debit" as const, label: "Debits" },
  ]

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === f.value ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
