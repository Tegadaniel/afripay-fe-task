"use client"

import { useState } from "react"
import type { Transaction } from "@/types/transaction"

interface TransactionItemProps {
  transaction: Transaction
  onDelete: (id: string) => void
  showAmounts: boolean
}

export default function TransactionItem({ transaction, onDelete, showAmounts }: TransactionItemProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  const isCredit = transaction.type === "credit"
  const amountColor = isCredit ? "text-emerald-400" : "text-red-400"
  const amountSign = isCredit ? "+" : "-"
  const badgeColor = isCredit ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const handleDeleteClick = () => {
    setShowConfirm(true)
  }

  const handleConfirmDelete = () => {
    onDelete(transaction.id)
    setShowConfirm(false)
  }

  const handleCancelDelete = () => {
    setShowConfirm(false)
  }

  return (
    <>
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${badgeColor}`}>
              {isCredit ? "↓" : "↑"}
            </div>
            <div className="min-w-0">
              <p className="text-white font-medium truncate">{transaction.description}</p>
              <p className="text-sm text-slate-400">{formattedDate}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <p className={`text-lg font-bold ${amountColor}`}>
            {showAmounts ? (
              <>
                {amountSign}₦
                {transaction.amount.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </>
            ) : (
              <span>••••••</span>
            )}
          </p>
          <button
            onClick={handleDeleteClick}
            className="px-3 py-1 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded transition-colors shrink-0"
          >
            Delete
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Transaction?</h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete "{transaction.description}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
