// import React, { useMemo } from "react";

// export default function SummaryCard({ expenses }) {
//   const total = useMemo(
//     () => expenses.reduce((s, e) => s + Number(e.amount || 0), 0),
//     [expenses]
//   );

//   const count = expenses.length;

//   const byCategory = useMemo(() => {
//     const map = {};
//     expenses.forEach((e) => {
//       map[e.category] = (map[e.category] || 0) + Number(e.amount || 0);
//     });
//     return map;
//   }, [expenses]);

//   const highestCategory = useMemo(() => {
//     const entries = Object.entries(byCategory);
//     if (!entries.length) return "—";
//     entries.sort((a, b) => b[1] - a[1]);
//     return `${entries[0][0]} ($${entries[0][1].toFixed(2)})`;
//   }, [byCategory]);

//   return (
//     <div className="summary-card card">
//       <div className="summary-grid">
//         <div className="summary-item">
//           <div className="label">Total Spent</div>
//           <div className="value">${total.toFixed(2)}</div>
//         </div>

//         <div className="summary-item">
//           <div className="label">Transactions</div>
//           <div className="value">{count}</div>
//         </div>

//         <div className="summary-item">
//           <div className="label">Highest Category</div>
//           <div className="value">{highestCategory}</div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useMemo } from "react";

export default function SummaryCard({ expenses }) {
  const total = useMemo(
    () => expenses.reduce((s, e) => s + Number(e.amount || 0), 0),
    [expenses]
  );

  const count = expenses.length;

  const byCategory = useMemo(() => {
    const map = {};
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + Number(e.amount || 0);
    });
    return map;
  }, [expenses]);

  const highestCategory = useMemo(() => {
    const entries = Object.entries(byCategory);
    if (!entries.length) return "—";
    entries.sort((a, b) => b[1] - a[1]);
    return `${entries[0][0]} (₹${entries[0][1].toFixed(2)})`;
  }, [byCategory]);

  return (
    <div className="summary-card card fancy">
      <div className="summary-grid">
        <div className="summary-item">
          <div className="label">Total Spent</div>
          <div className="value primary-accent">₹{total.toFixed(2)}</div>
          <div className="small muted">Across all time</div>
        </div>

        <div className="summary-item">
          <div className="label">Transactions</div>
          <div className="value">{count}</div>
          <div className="small muted">Total entries</div>
        </div>

        <div className="summary-item">
          <div className="label">Highest Category</div>
          <div className="value">{highestCategory}</div>
          <div className="small muted">Top spending area</div>
        </div>
      </div>
    </div>
  );
}