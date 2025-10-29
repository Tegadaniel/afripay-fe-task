"use client";

import type React from "react";

import { useState } from "react";
import type { Transaction } from "@/types/transaction";

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
}

export default function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "credit" as "credit" | "debit",
    date: new Date().toISOString().split("T")[0],
  });

  const formatAmountInput = (value: string) => {
    // Remove all non-digit and non-decimal characters
    const cleaned = value.replace(/[^\d.]/g, "");

    // Split by decimal point
    const parts = cleaned.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Add commas to integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Reconstruct the number
    if (decimalPart !== undefined) {
      return `${formattedInteger}.${decimalPart.slice(0, 2)}`;
    }
    return formattedInteger;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAmountInput(e.target.value);
    setFormData({ ...formData, amount: formatted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.description.trim() || !formData.amount) {
      alert("Please fill in all fields");
      return;
    }

    const numericAmount = Number.parseFloat(formData.amount.replace(/,/g, ""));

    onSubmit({
      description: formData.description,
      amount: numericAmount,
      type: formData.type,
      date: formData.date,
    });

    setFormData({
      description: "",
      amount: "",
      type: "credit",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-lg"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="e.g., Salary, Groceries"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Amount (₦)
          </label>
          <input
            type="text"
            value={formData.amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as "credit" | "debit",
              })
            }
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="credit">Credit (Inflow)</option>
            <option value="debit">Debit (Outflow)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 rounded-lg transition-colors"
      >
        Add Transaction
      </button>
    </form>
  );
}
