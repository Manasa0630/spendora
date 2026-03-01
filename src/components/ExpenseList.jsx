import React from "react";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  if (!expenses || expenses.length === 0) {
    return <div className="empty">No expenses yet. Add your first expense!</div>;
  }

  return (
    <div className="expense-list">
      {expenses.map((exp) => (
        <ExpenseItem key={exp.id} expense={exp} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}