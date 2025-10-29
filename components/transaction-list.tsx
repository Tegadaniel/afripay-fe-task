"use client"

import type { Transaction } from "@/types/transaction"
import TransactionItem from "./transaction-item"
import ExportButton from "./export-button"

interface TransactionListProps {
  transactions: Transaction[]
  onDelete: (id: string) => void
  showAmounts: boolean
}

export default function TransactionList({ transactions, onDelete, showAmounts }: TransactionListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Transactions ({transactions.length})</h2>
        {transactions.length > 0 && <ExportButton transactions={transactions} />}
      </div>

      {transactions.length === 0 ? (
        <div className="bg-slate-800 rounded-lg p-12 text-center border border-slate-700">
          <p className="text-slate-400">No transactions yet. Add one to get started!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={onDelete}
              showAmounts={showAmounts}
            />
          ))}
        </div>
      )}
    </div>
  )
}
