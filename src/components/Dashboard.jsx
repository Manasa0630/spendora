import React, { useEffect, useMemo, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import SummaryCard from "./SummaryCard";
import ChartSection from "./ChartSection";

const STORAGE_KEY = "expenses_v1";
const CATEGORIES = ["All", "Food", "Travel", "Bills", "Shopping", "Other"];

 function Dashboard({ searchQuery = "" }) {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All"); // format: YYYY-MM

  // load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setExpenses(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load expenses:", e);
    }
  }, []);

  // save to localStorage when expenses change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const updateExpense = (updated) => {
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setEditing(null);
  };

  const deleteExpense = (id) => {
    if (!window.confirm("Delete this expense?")) return;
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const startEdit = (expense) => setEditing(expense);

  // filters applied to list and charts
  const filteredExpenses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return expenses.filter((e) => {
      if (categoryFilter !== "All" && e.category !== categoryFilter) return false;
      if (monthFilter !== "All") {
        const ym = e.date.slice(0, 7); // YYYY-MM
        if (ym !== monthFilter) return false;
      }

      if (query) {
        const haystack = `${e.title} ${e.category} ${e.note || ""}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [expenses, categoryFilter, monthFilter, searchQuery]);

  // derived months available for filter
  const months = useMemo(() => {
    const set = new Set(expenses.map((e) => e.date.slice(0, 7)));
    return ["All", ...Array.from(set).sort((a, b) => b.localeCompare(a))];
  }, [expenses]);

  return (
    <div className="dashboard">
      <div className="top-row">
        <SummaryCard expenses={expenses} />
        <div className="form-card card">
          <ExpenseForm
            categories={CATEGORIES.filter((c) => c !== "All")}
            onAdd={addExpense}
            editing={editing}
            onUpdate={updateExpense}
            onCancel={() => setEditing(null)}
          />
        </div>
      </div>

      <div className="controls">
        <div className="filter">
          <label>
            Category:
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            Month:
            <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m === "All" ? "All" : m}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="summary-mini">
          <strong>Showing:</strong> {filteredExpenses.length} transaction
          {filteredExpenses.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="content-row">
        <div className="list-column card">
          <h3>Expenses</h3>
          <ExpenseList
            expenses={filteredExpenses}
            onDelete={deleteExpense}
            onEdit={startEdit}
          />
        </div>

        <div className="chart-column card">
          <ChartSection expenses={filteredExpenses.length ? filteredExpenses : expenses} />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
