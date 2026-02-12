import React, { useEffect, useState } from "react";

const blank = {
  title: "",
  amount: "",
  category: "Food",
  date: "",
  note: "",
};

export default function ExpenseForm({ categories, onAdd, editing, onUpdate, onCancel }) {
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || "",
        amount: String(editing.amount),
        category: editing.category || categories[0],
        date: editing.date || "",
        note: editing.note || "",
        id: editing.id,
      });
      setErrors({});
    } else {
      setForm(blank);
    }
  }, [editing, categories]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (Number.isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = "Amount must be > 0";
    if (!form.date) e.date = "Date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const payload = {
      id: form.id || Date.now().toString(),
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      note: form.note.trim(),
    };

    if (editing) {
      onUpdate(payload);
    } else {
      onAdd(payload);
    }
    setForm(blank);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>{editing ? "Edit Expense" : "Add Expense"}</h3>

      <label>
        Title
        <input
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="e.g., Grocery, Uber"
        />
        {errors.title && <small className="error">{errors.title}</small>}
      </label>

      <label className="row">
        <div>
          <div>Amount</div>
          <input
            type="number"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            placeholder="0.00"
          />
          {errors.amount && <small className="error">{errors.amount}</small>}
        </div>

        <div>
          <div>Category</div>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </label>

      <label>
        Date
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
        />
        {errors.date && <small className="error">{errors.date}</small>}
      </label>

      <label>
        Notes
        <input
          value={form.note}
          onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          placeholder="Optional note"
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn primary">
          {editing ? "Update" : "Add Expense"}
        </button>
        {editing ? (
          <button
            type="button"
            className="btn"
            onClick={() => {
              onCancel();
              setForm(blank);
            }}
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            className="btn"
            onClick={() => setForm(blank)}
          >
            Reset
          </button>
        )}
      </div>
    </form>
  );
}