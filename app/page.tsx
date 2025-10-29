"use client"

import { useState, useEffect } from "react"
import TransactionSummary from "@/components/transaction-summary"
import TransactionForm from "@/components/transaction-form"
import TransactionList from "@/components/transaction-list"
import TransactionFilters from "@/components/transaction-filters"
import type { Transaction } from "@/types/transaction"

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showAmounts, setShowAmounts] = useState(true)

  // Load transactions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("transactions")
    if (saved) {
      try {
        setTransactions(JSON.parse(saved))
      } catch (error) {
        console.error("Failed to load transactions:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("transactions", JSON.stringify(transactions))
    }
  }, [transactions, isLoading])

  const addTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
    }
    setTransactions([transaction, ...transactions])
    setIsFormOpen(false)
  }

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true
    return t.type === filter
  })

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Transaction Dashboard
            </h1>
            <p className="text-slate-400">
              Manage and track your financial transactions
            </p>
          </div>
          <button
            onClick={() => setShowAmounts(!showAmounts)}
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
            title={showAmounts ? "Hide amounts" : "Show amounts"}
          >
            {showAmounts ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753L3.596 3.596m16.807 16.807L9.404 9.404m0 0L6.643 6.643"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Summary Cards */}
        <TransactionSummary
          transactions={transactions}
          showAmounts={showAmounts}
        />

        {/* Controls Section */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TransactionFilters filter={filter} onFilterChange={setFilter} />
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center justify-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
          >
            {isFormOpen ? "Cancel" : "+ Add Transaction"}
          </button>
        </div>

        {/* Form */}
        {isFormOpen && (
          <div className="mt-6">
            <TransactionForm onSubmit={addTransaction} />
          </div>
        )}

        {/* Transactions List */}
        <div className="mt-8">
          <TransactionList
            transactions={filteredTransactions}
            onDelete={deleteTransaction}
            showAmounts={showAmounts}
          />
        </div>
      </div>
    </main>
  );
}
