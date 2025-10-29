"use client"

import type { Transaction } from "@/types/transaction"

interface TransactionSummaryProps {
  transactions: Transaction[]
  showAmounts: boolean
}

export default function TransactionSummary({ transactions, showAmounts }: TransactionSummaryProps) {
  const totalInflow = transactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0)

  const totalOutflow = transactions.filter((t) => t.type === "debit").reduce((sum, t) => sum + t.amount, 0)

  const netBalance = totalInflow - totalOutflow

  const summaryCards = [
    {
      label: "Total Inflow",
      value: totalInflow,
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-400",
    },
    {
      label: "Total Outflow",
      value: totalOutflow,
      color: "from-red-500 to-rose-600",
      textColor: "text-red-400",
    },
    {
      label: "Net Balance",
      value: netBalance,
      color: "from-blue-500 to-cyan-600",
      textColor: netBalance >= 0 ? "text-emerald-400" : "text-red-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {summaryCards.map((card) => (
        <div
          key={card.label}
          className={`bg-linear-to-br ${card.color} rounded-lg p-6 text-white shadow-lg`}
        >
          <p className="text-sm font-medium opacity-90">{card.label}</p>
          <p className={`text-3xl font-bold mt-2 ${card.textColor}`}>
            {showAmounts ? (
              <>
                ₦
                {card.value.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </>
            ) : (
              <span className="text-2xl">••••••</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
