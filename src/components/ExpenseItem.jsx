
import React from "react";

const CATEGORY_COLORS = {
  Food: "#FF8A65",
  Travel: "#4FC3F7",
  Bills: "#9575CD",
  Shopping: "#F06292",
  Other: "#A1887F",
};

const CATEGORY_EMOJI = {
  Food: "🍔",
  Travel: "✈️",
  Bills: "🧾",
  Shopping: "🛍️",
  Other: "🔖",
};

export default function ExpenseItem({ expense, onDelete, onEdit }) {
  const { id, title, amount, category, date, note } = expense;
  const color = CATEGORY_COLORS[category] || "#90A4AE";
  const emoji = CATEGORY_EMOJI[category] || "💡";

  return (
    <div className="expense-item">
      <div className="left">
        <div className="badge" style={{ background: color + "22", borderColor: color }}>
          <span className="emoji">{emoji}</span>
        </div>

        <div className="meta">
          <div className="title-row">
            <strong className="title">{title}</strong>
            <span className="date muted">{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="muted small">
            <span className="category-pill" style={{ background: color + "16", color }}>
              {category}
            </span>
            {note ? <span className="note"> • {note}</span> : null}
          </div>
        </div>
      </div>

      <div className="right">
        <div className="amount">${Number(amount).toFixed(2)}</div>
        <div className="actions">
          <button className="btn tiny" onClick={() => onEdit(expense)}>
            Edit
          </button>
          <button className="btn tiny danger" onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}