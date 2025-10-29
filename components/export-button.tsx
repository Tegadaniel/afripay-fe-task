"use client"

import type { Transaction } from "@/types/transaction"

interface ExportButtonProps {
  transactions: Transaction[]
}

export default function ExportButton({ transactions }: ExportButtonProps) {
  const exportToCSV = () => {
    const headers = ["ID", "Description", "Amount", "Type", "Date"]
    const rows = transactions.map((t) => [t.id, t.description, t.amount, t.type, t.date])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => (typeof cell === "string" && cell.includes(",") ? `"${cell}"` : cell)).join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={exportToCSV}
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors text-sm"
    >
      ↓ Export CSV
    </button>
  )
}
